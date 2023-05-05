# Generated by Django 4.2 on 2023-05-05 06:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AiToolCategoryRelation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField()),
                ('ai_tool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.aitool')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.aitoolcategory')),
            ],
            options={
                'ordering': ['order'],
                'unique_together': {('ai_tool', 'category')},
            },
        ),
    ]
