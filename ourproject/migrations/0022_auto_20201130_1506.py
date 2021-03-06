# Generated by Django 3.1.2 on 2020-11-30 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0021_auto_20201125_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='sell_product',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='branch',
            field=models.CharField(choices=[('Civil Engineer', 'Civil Engineer'), ('Computer Engineer', 'Computer Engineer'), ('E&TC Engineer', 'E&TC Engineer'), ('Mechanical Engineer', 'Mechanical Engineer'), ('Information Technology', 'Information Technology')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='year',
            field=models.CharField(choices=[('FE', 'FE'), ('TE', 'TE'), ('SE', 'SE'), ('BE', 'BE')], default='', max_length=50),
        ),
    ]
