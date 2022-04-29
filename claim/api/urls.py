from django.urls import include, path
from . import views

urlpatterns = [
  path('get_claim_types', views.get_claim_types),
  path('get_submission_types', views.get_submission_types),
  path('get_service_advisors', views.get_service_advisors),
  path('get_technicians', views.get_technicians),
  path('get_dealerships', views.get_dealerships),
  # path('add_claim', views.add_claim),
  # path('get_claim/<int:claim_id>', views.get_claim),
  # path('get_claims', views.get_claims),
  # path('get_claims_dealership/<dealership_name>', views.get_claims_dealership),
  path('claim/', views.ClaimView.as_view(), name= 'claim_list'),
  # path('get_claim_by_dealership/<dealership>', views.get_claim_by_dealership),
  path('download_pdf', views.download_pdf),
  path('change_archive/<int:claim_id>', views.change_archive),
  # path('add_dealership', views.add_dealership),
#   path('updatebook/<int:book_id>', views.update_book),
#   path('deletebook/<int:book_id>', views.delete_book)
]