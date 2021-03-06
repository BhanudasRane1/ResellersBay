# Generated by Django 3.1.2 on 2020-12-01 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ourproject', '0029_auto_20201201_2334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_a',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_b',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_c',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_d',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_e',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='book_type_f',
            field=models.CharField(blank=True, choices=[('Original', 'Original'), ('Second-Hand', 'Second-Hand'), ('Photocopy', 'Photocopy')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='branch',
            field=models.CharField(choices=[('Civil Engineer', 'Civil Engineer'), ('Mechanical Engineer', 'Mechanical Engineer'), ('Computer Engineer', 'Computer Engineer'), ('E&TC Engineer', 'E&TC Engineer'), ('Information Technology', 'Information Technology')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='sell_product',
            name='year',
            field=models.CharField(choices=[('SE', 'SE'), ('TE', 'TE'), ('BE', 'BE'), ('FE', 'FE')], default='', max_length=50),
        ),
    ]
