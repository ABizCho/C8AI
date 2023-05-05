from django.db import models
# from accounts.models import User


class AiToolCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name_set =  models.JSONField(default=dict)  # name_set: {ko: string[], en: string[] }
    
    class Meta:
        managed = True #db에 테이블을 추가 및 삭제한다.
        db_table = 'core_aitool_category' 
    
class AiTool(models.Model):
    id = models.AutoField(primary_key=True)
    imgUrl = models.CharField(max_length=255)
    
    name_set = models.JSONField(default=dict) # name_set: {ko: string[], en: string[]}
    summary = models.TextField(default='Unknown')
    redirectUrl = models.CharField(max_length=255, default='https://cmd8.vercel.app/')
    categories = models.ManyToManyField(AiToolCategory, related_name='ai_tools') #N-M관계, 역참조이름 설정
    
    class Meta:
        managed = True #db에 테이블을 추가 및 삭제한다.
        db_table = 'core_aitool' 


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

