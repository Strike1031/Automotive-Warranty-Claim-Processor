from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm

from .models import Dealership, ServiceAdvisor, Technician


class DealershipAdminForm(ModelForm):

    class Meta(ModelForm):
        model = Dealership
        fields = ('name',)


class ServiceAdvisorAdminForm(ModelForm):

    class Meta(ModelForm):
        model = ServiceAdvisor
        fields = ('name',)


class TechnicianAdminForm(ModelForm):

    class Meta(ModelForm):
        model = Technician
        fields = ('name',)        

