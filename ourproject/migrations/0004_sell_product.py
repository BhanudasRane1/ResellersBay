# Generated by Django 3.1.2 on 2020-11-10 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ourproject', '0003_delete_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='sell_product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('branch', models.CharField(max_length=50)),
                ('year', models.CharField(max_length=50)),
                ('price', models.CharField(max_length=5)),
                ('image', models.ImageField(default='', upload_to='pics')),
            ],
        ),
    ]
