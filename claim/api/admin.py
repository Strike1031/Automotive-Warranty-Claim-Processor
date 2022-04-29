from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import ModelAdmin

from .forms import DealershipAdminForm, ServiceAdvisorAdminForm, TechnicianAdminForm
from .models import Dealership, ServiceAdvisor, Technician
from django.contrib.auth.models import Group


class DealershipAdmin(ModelAdmin):
    form = DealershipAdminForm
    model = Dealership
    list_display = ('name', 'description')
    list_filter = ('name', 'description')
    fieldsets = (
        (None, {'fields':  ('name', 'description')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'description')}
        ),
    )
    search_fields = ('name',)
    ordering = ('name',)


class ServiceAdvisorAdmin(ModelAdmin):
    form = ServiceAdvisorAdminForm
    model = ServiceAdvisor
    list_display = ('name',)
    list_filter = ('name',)
    fieldsets = (
        (None, {'fields':  ('name',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name',)}
        ),
    )
    search_fields = ('name',)
    ordering = ('name',) 


class TechnicianAdmin(ModelAdmin):
    form = TechnicianAdminForm
    model = Technician
    list_display = ('name',)
    list_filter = ('name',)
    fieldsets = (
        (None, {'fields':  ('name',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name',)}
        ),
    )
    search_fields = ('name',)
    ordering = ('name',)        


admin.site.register(Dealership, DealershipAdmin)
admin.site.register(ServiceAdvisor, ServiceAdvisorAdmin)
admin.site.register(Technician, TechnicianAdmin)
admin.site.unregister(Group)

