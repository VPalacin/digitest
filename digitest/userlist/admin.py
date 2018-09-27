from django.contrib import admin
from .models import UserList, ListRow
# Register your models here.

class RowInline(admin.options.TabularInline):
    model = ListRow
    extra = 0
    
@admin.register(UserList)
class UserListAdmin(admin.ModelAdmin):
    inlines = [RowInline,]
