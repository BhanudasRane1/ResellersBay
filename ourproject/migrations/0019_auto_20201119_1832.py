# Generated by Django 3.1.2 on 2020-11-19 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0018_auto_20201119_1802'),
    ]

    operations = [
        migrations.AddField(
            model_name='sell_product',
            name='image_c',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AddField(
            model_name='sell_product',
            name='image_d',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AddField(
            model_name='sell_product',
            name='image_e',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AddField(
            model_name='sell_product',
            name='image_f',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type',
            field=models.CharField(choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='branch',
            field=models.CharField(choices=[('Mechanical Engineer', 'Mechanical Engineer'), ('Computer Engineer', 'Computer Engineer'), ('Information Technology', 'Information Technology'), ('Civil Engineer', 'Civil Engineer')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='year',
            field=models.CharField(choices=[('FE', 'FE'), ('SE', 'SE'), ('BE', 'BE'), ('TE', 'TE')], default='', max_length=50),
        ),
    ]
