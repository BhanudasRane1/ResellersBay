# Generated by Django 3.1.2 on 2020-11-19 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0014_auto_20201119_1629'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sell_product',
            name='image',
        ),
        migrations.AddField(
            model_name='sell_product',
            name='image_a',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AddField(
            model_name='sell_product',
            name='image_b',
            field=models.ImageField(blank=True, null=True, upload_to='sell/Images'),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type',
            field=models.CharField(choices=[('Original', 'Original'), ('Photocopy', 'Photocopy'), ('Second-Hand', 'Second-Hand')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='branch',
            field=models.CharField(choices=[('Civil Engineer', 'Civil Engineer'), ('Computer Engineer', 'Computer Engineer'), ('Mechanical Engineer', 'Mechanical Engineer'), ('Information Technology', 'Information Technology')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='year',
            field=models.CharField(choices=[('3', 'TE'), ('4', 'BE'), ('2', 'SE'), ('1', 'FE')], default='', max_length=50),
        ),
    ]
