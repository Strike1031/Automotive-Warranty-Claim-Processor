# Generated by Django 3.2 on 2021-04-17 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='claim',
            name='archive',
            field=models.BooleanField(default=0),
        ),
    ]
