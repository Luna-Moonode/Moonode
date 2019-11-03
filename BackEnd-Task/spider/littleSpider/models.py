from django.db import models


class ArticlesInfo(models.Model):
    id = models.AutoField(primary_key=True)
    page = models.IntegerField(default=0)
    name = models.CharField(max_length=50, default='')
    info = models.TextField(max_length=2000)

    def __str__(self):
        return '{' + '"page": {}, "name": {}, "info": {}'.format(self.page, '"'+self.name+'"', self.info) + '}'
