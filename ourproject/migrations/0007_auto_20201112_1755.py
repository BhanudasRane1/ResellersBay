# Generated by Django 3.1.2 on 2020-11-12 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0006_auto_20201112_1359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sell_product',
            name='image',
            field=models.ImageField(default='', upload_to=''),
        ),
    ]
