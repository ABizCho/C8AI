from django.db import models
import json
# from django.contrib.postgres.fields import JSONField

# from accounts.models import User

### Abstracts
class AbstractTool(models.Model):
    id = models.AutoField(primary_key=True)
    imgUrl = models.CharField(max_length=255)
    name = models.JSONField(default=dict) # name: {ko: string[], en: string[]}
    summary = models.TextField(default='Unknown')
    redirectUrl = models.CharField(max_length=255, default='https://cmd8.vercel.app/')
    
    class Meta:
        abstract = True

### models
class AiToolCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name =  models.JSONField(default=dict)  # name: { ko: string[], en: string[] }
    
class AiTool(AbstractTool):
    categories = models.ManyToManyField(AiToolCategory, related_name='ai_tools') #N-M관계, 역참조이름 설정
    
    class Meta(AbstractTool.Meta):
        managed = True #db에 테이블을 추가 및 삭제한다.
        db_table = 'tb_aitool' 

        


# ### User 기반
# class AiToolScore(models.Model):
#     id = models.AutoField(primary_key=True)
#     tool = models.ForeignKey(AiTool, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     score = models.FloatField()

# class AiToolFavorite(models.Model):
#     id = models.AutoField(primary_key=True)
#     tool = models.ForeignKey(AiTool, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

