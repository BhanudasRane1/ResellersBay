# Generated by Django 3.1.2 on 2020-11-12 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0007_auto_20201112_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sell_product',
            name='image',
            field=models.ImageField(default='', upload_to='sell/Images'),
        ),
    ]
