from .models import UserList
from django.template import loader
from django.http.response import HttpResponse, HttpResponseServerError,\
    JsonResponse
from django.core import serializers

def index(request):
    try:
        ulist = UserList.objects.all().order_by('?').first()
    except:
        return
    template = loader.get_template('userlist/userlist.html')
    context ={'userlist': ulist,}
    return HttpResponse(template.render(context, request))
    
def get_list(request):
    name = request.GET.get("name",None)
    try:
        userlist = UserList.objects.get(name=name)
    except:
        return HttpResponseServerError()
    data = {
        'list':serializers.serialize('json',[userlist]),
        'rows':serializers.serialize('json',userlist.rows.all().order_by("position"))
        }
    return JsonResponse(data, safe=False)
