import os
import sys
from django.contrib.auth.models import Group, Permission
# from django.contrib.contenttypes.models import ContentType


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'claim.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

    # try:
    #     Permission.objects.all().delete()
    # except :
    #     print("DB init error")


if __name__ == '__main__':
    main()


# from api.models import Project
# new_group, created = Group.objects.get_or_create(name='new_group')
# # Code to add permission to group ???
# ct = ContentType.objects.get_for_model(Project)

# # Now what - Say I want to add 'Can add project' permission to new_group?
# permission = Permission.objects.create(codename='can_add_project',
#                                    name='Can add project',
#                                    content_type=ct)
# new_group.permissions.add(permission)