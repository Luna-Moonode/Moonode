# Generated by Django 2.2.5 on 2019-11-02 04:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('littleSpider', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='articlesinfo',
            name='url',
        ),
    ]
