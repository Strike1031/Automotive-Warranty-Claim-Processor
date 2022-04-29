from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.fields import NullBooleanField
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .serializers import ClaimTypeSerializer, SubmissionTypeSerializer, ServiceAdvisorSerializer, TechnicianSerializer, ClaimSerializer, DealershipSerializer
from .models import ClaimType, Dealership, SubmissionType, ServiceAdvisor, Technician, Claim
from rest_framework import status
import os
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Permission
from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from datetime import datetime

from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView

from os.path import join, dirname
from dotenv import load_dotenv
import boto3
from botocore.exceptions import ClientError

import requests
import os
from http.client import HTTPResponse
from django.http import HttpResponseRedirect



cur_path = dirname(__file__)
root_path = cur_path[:cur_path.rfind(os.path.sep)]
load_dotenv(join(root_path, '.env'))
s3_bucket = os.environ.get('S3_BUCKET')
print('s3_bucekt = ', s3_bucket)


def aws_session(region_name='us-east-1'):
    return boto3.session.Session(aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                                aws_secret_access_key=os.getenv('AWS_ACCESS_KEY_SECRET'),
                                region_name=region_name)


def upload_file_to_bucket(file_path, folder_name):
    session = aws_session()
    s3_resource = session.resource('s3')
    file_dir, file_name = os.path.split(file_path)

    bucket = s3_resource.Bucket(s3_bucket)
    bucket.upload_file(
      Filename=file_path,
      Key=folder_name + "/" + file_name,
      ExtraArgs={'ACL': 'public-read'}
    )

    s3_url = f"https://{s3_bucket}.s3.amazonaws.com/{file_name}"
    return s3_url


def delete_folder_from_bucket(folder_name):
    s3_client = boto3.client('s3')
    PREFIX = folder_name + '/'
    response = s3_client.list_objects_v2(Bucket=s3_bucket, Prefix=PREFIX)

    for object in response['Contents']:
        print('Deleting', object['Key'])
        s3_client.delete_object(Bucket=s3_bucket, Key=object['Key'])                                

# @api_view(["GET"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def get_dealerships(request):
#     user_id = request.user.id
#     permissions = Permission.objects.filter(user=user_id)
#     print([p for p in permissions])
#     user = get_object_or_404(CustomUser, pk=user_id)
#     # if user.has_perm("auth.add_permission"): 
#     #     print("True")
#     # else:
#     #     print("False")
#     # if user.has_perm("auth.change_permission"): 
#     #     print("True")
#     # else:
#     #     print("False")
#     dealerships = ""
#     dealership_name = request.GET.get("name", "")
#     print([i for i in request.GET.items()])
#     print("##" + dealership_name + "##")
#     if dealership_name == "":
#         dealerships = Dealership.objects.all()
#     else:
#         dealerships = Dealership.objects.filter(name=dealership_name)
    
#     serializer = DealershipSerializer(dealerships, many=True)
#     return JsonResponse({'dealerships': serializer.data}, safe=False, status=status.HTTP_200_OK)


@api_view(["GET"])
# @csrf_exempt
# @permission_classes([IsAuthenticated])
def get_claim_types(request):
    claim_types = ClaimType.objects.all()
    
    serializer = ClaimTypeSerializer(claim_types, many=True)
    return JsonResponse({'claim_types': serializer.data}, safe=False, status=status.HTTP_200_OK) 


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def get_submission_types(request):
    submission_types = SubmissionType.objects.all()
    
    serializer = SubmissionTypeSerializer(submission_types, many=True)
    return JsonResponse({'submission_types': serializer.data}, safe=False, status=status.HTTP_200_OK) 


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def get_service_advisors(request):
    service_advisor = ServiceAdvisor.objects.all()
    
    serializer = ServiceAdvisorSerializer(service_advisor, many=True)
    return JsonResponse({'service_advisor': serializer.data}, safe=False, status=status.HTTP_200_OK) 


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def get_technicians(request):
    technicians = Technician.objects.all()
    
    serializer = TechnicianSerializer(technicians, many=True)
    return JsonResponse({'technicians': serializer.data}, safe=False, status=status.HTTP_200_OK)


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def get_dealerships(request):
    dealerships = Dealership.objects.all()
    
    serializer = DealershipSerializer(dealerships, many=True)
    return JsonResponse({'dealerships': serializer.data}, safe=False, status=status.HTTP_200_OK)   


# @api_view(["GET"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def get_claim_by_dealership(request):
#     dealerships = Dealership.objects.all()
    
#     serializer = DealershipSerializer(dealerships, many=True)
#     return JsonResponse({'dealerships': serializer.data}, safe=False, status=status.HTTP_200_OK)  


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def change_archive(request, claim_id):
    print(request.GET["archive"])
    claim = Claim.objects.filter(id=claim_id).update(archive=request.GET["archive"])
    
    return JsonResponse({'response': 'ok'}, safe=False, status=status.HTTP_200_OK)                      


# @api_view(["POST"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def add_claim(request):
#     try:
#         dealership = Claim.objects.create(
#             repair_order=request.POST["repair_order"],
#             pdf=request.POST["pdf"],
#             dealership = Dealership.objects.filter(name=request.POST["dealership"]).first(),
#             claim_type = ClaimType.objects.filter(name=request.POST["claim_type"]).first(),
#             submission_type = SubmissionType.objects.filter(name=request.POST["submission_type"]).first(),
#             service_advisor = ServiceAdvisor.objects.filter(name=request.POST["service_advisor"]).first(),
#             technician = Technician.objects.filter(name=request.POST["technician"]).first(),
#             upload_date = datetime.now()
#         )
#         serializer = ClaimSerializer(dealership)
#         return JsonResponse({'claims': serializer.data}, safe=False, status=status.HTTP_201_CREATED)
#     except ObjectDoesNotExist as e:
#         return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
#     except Exception as err:
#         print(err)
#         return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


# @api_view(["GET"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def get_claims(request):
#     claims = Claim.objects.all()
    
#     serializer = ClaimSerializer(claims, many=True)
#     return JsonResponse({'claims': serializer.data}, safe=False, status=status.HTTP_200_OK)           


# @api_view(["GET"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def get_claim(request, claim_id):
#     claims = Claim.objects.filter(id=claim_id)
    
#     serializer = ClaimSerializer(claims, many=True)
#     return JsonResponse({'claims': serializer.data}, safe=False, status=status.HTTP_200_OK)


# @api_view(["GET"])
# @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def get_claims_dealership(request, dealership_name):
#     claims = Claim.objects.filter(dealership=dealership_name)
    
#     serializer = ClaimSerializer(claims, many=True)
#     return JsonResponse({'claims': serializer.data}, safe=False, status=status.HTTP_200_OK)    


class PdfUploadParser(FileUploadParser):
    media_type = 'pdf/*'
class ClaimView(APIView):
    parser_class = (PdfUploadParser,)

    def put(self, request, format=None):
        print("############ put ")
        if 'file' not in request.data:
            raise ParseError("Empty content")

        f = request.data['file']

        Claim.pdf.save(f.name, f, save=True)
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        Claim.pdf.delete(save=True)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        print([i for i in request.GET])
        posts = ""
        if "dealership" in request.GET :
            if request.GET["dealership"] == "archive":
                posts = Claim.objects.filter(archive = 1)
            else:
                posts = Claim.objects.filter(dealership = request.GET["dealership"], archive = 0)
        else:
            posts = Claim.objects.all()
        serializer = ClaimSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print("############ post ")
        posts_serializer = ClaimSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            print(posts_serializer.data["pdf"])
            pdf = posts_serializer.data["pdf"]
            file_name = pdf[pdf.rfind("/")+1:]
            print("file_name = ", file_name)

            # Upload to S3 Bucket
            file_path = join(root_path, "pdf_folder", file_name)
            print("#"*50)
            print(os.path.sep)
            print(root_path, file_path)
            print(str(file_path.rfind(os.path.sep)))
            print(file_path, posts_serializer.data["dealership"])
            try:
                upload_file_to_bucket(file_path, posts_serializer.data["dealership"])
            except :
                print("Upload error")
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def download_pdf(request):
    dealership = request.GET["dealership"]
    pdf = request.GET["pdf"]
    
    # dealership ="d-2"
    # pdf = "Kinechek-1in_stroke.pdf"

    session = aws_session()
    s3 = session.client('s3')

    url = s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': s3_bucket,
            'Key': dealership + "/" + pdf
        },
    )
    print("url = ", url)
    return JsonResponse({'url': url}, safe=False, status=status.HTTP_200_OK)           

#     repair_order = models.IntegerField( help_text='Enter Repair Order Number')
#     pdf = models.CharField( max_length=100, verbose_name='PDF file name' )
#     dealership = models.ForeignKey(Dealership, on_delete=models.CASCADE, verbose_name='dealership name', null=True) 
#     service_advisor = models.ForeignKey(ServiceAdvisor, on_delete=models.CASCADE, verbose_name='service advisor name', null=True) 
#     technician = models.ForeignKey(Technician, on_delete=models.CASCADE, verbose_name='technician name', null=True) 
#     claim_type = models.ForeignKey(ClaimType, on_delete=models.CASCADE, verbose_name='claim type', null=True) 
#     submission_type = models.ForeignKey(SubmissionType, on_delete=models.CASCADE, verbose_name='submission type', null=True)        


# @api_view(["POST"])
# # @csrf_exempt
# # @permission_classes([IsAuthenticated])
# def add_dealership(request):
#     print(request.body)
#     print(request.POST["name"])
#     print(request.POST["description"])
#     print(request.POST.get("description", ""))
#     # payload = json.loads(request.body)
#     try:
#         dealership = Dealership.objects.create(
#             name=request.POST["name"],
#             description=request.POST.get("description", ""),
#         )
#         print("1")
#         serializer = DealershipSerializer(dealership)
#         return JsonResponse({'dealerships': serializer.data}, safe=False, status=status.HTTP_201_CREATED)
#     except ObjectDoesNotExist as e:
#         return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
#     except Exception:
#         return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    