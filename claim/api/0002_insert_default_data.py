from django.db import migrations
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
# from api.models import Project

def initial_group(apps, schema_editor):
    group_permission = {
        "super_admin": ["view_claim", "add_dealership", "change_dealership", "delete_dealership", "view_dealership", "add_serviceadvisor", "change_serviceadvisor", "delete_serviceadvisor", "view_serviceadvisor", "add_technician", "change_technician", "delete_technician", "view_technician", "add_customuser", "change_customuser", "delete_customuser", "view_customuser", "view_claimtype", "view_status", "view_submissiontype", ],
        "dealership_admin": ["add_claim", "change_claim", "delete_claim", "view_claim", "view_customuser", "add_customuser", "change_customuser", "delete_customuser", "view_claimtype", "view_status", "view_submissiontype", "view_dealership", "view_serviceadvisor", "view_technician", ],
        "dealership_user": ["add_claim", "change_claim", "delete_claim", "view_claim", "view_customuser", "view_claimtype", "view_status", "view_submissiontype", "view_dealership", "view_serviceadvisor", "view_technician", ],
    }
    for group_name in group_permission:
        new_group, created = Group.objects.get_or_create(name=group_name)
        for permission_name in group_permission[group_name]:
            permission = Permission.objects.filter(codename=permission_name)[0].id
            new_group.permissions.add(permission)


def initial_status(apps, schema_editor):
    Status = apps.get_model('api', 'Status')
    statuses = ['New', 'Updated', 'Unresolved', 'Pending', 'Risk']
    for status_name in statuses:
        status = Status(name=status_name)
        status.save()


def initial_claim_type(apps, schema_editor):
    ClaimType = apps.get_model('api', 'ClaimType')
    claim_types = ['Repair', 'Recall', 'Maintenance', 'PDI']
    for claim_type_name in claim_types:
        claim_type = ClaimType(name=claim_type_name)
        claim_type.save()


def initial_submission_type(apps, schema_editor):
    SubmissionType = apps.get_model('api', 'SubmissionType')
    submission_types = ['Initial', 'Rework']
    for submission_type_name in submission_types:
        submission_type = SubmissionType(name=submission_type_name)
        submission_type.save()



class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [        
        migrations.RunPython(initial_status),
        migrations.RunPython(initial_claim_type),
        migrations.RunPython(initial_submission_type),
        migrations.RunPython(initial_group),
    ]