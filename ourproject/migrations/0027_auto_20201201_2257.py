# Generated by Django 3.1.2 on 2020-12-01 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0026_auto_20201201_1812'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_a',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_b',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_c',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_d',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_e',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_f',
            field=models.CharField(choices=[('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy'), ('Original', 'Original')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='branch',
            field=models.CharField(choices=[('Computer Engineer', 'Computer Engineer'), ('E&TC Engineer', 'E&TC Engineer'), ('Mechanical Engineer', 'Mechanical Engineer'), ('Civil Engineer', 'Civil Engineer'), ('Information Technology', 'Information Technology')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='year',
            field=models.CharField(choices=[('TE', 'TE'), ('BE', 'BE'), ('FE', 'FE'), ('SE', 'SE')], default='', max_length=50),
        ),
    ]
