from django.db import models

class UserList(models.Model):
    name = models.CharField(max_length=200)
    
    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name
    
class ListRow(models.Model):
    list = models.ForeignKey(UserList, on_delete=models.CASCADE, related_name='rows')
    content = models.CharField(max_length=200)
    position = models.PositiveSmallIntegerField(default=0)