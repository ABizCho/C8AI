from django.db import models
# from django.contrib.postgres.fields import JSONField

class CommonInfo(models.Model):
    id = models.AutoField(primary_key=True)
    imgUrl = models.CharField(max_length=255)
    ko = models.JSONField()
    en = models.JSONField()
    
    class Meta:
        abstract = True

####
class AiTool(CommonInfo):
    class Meta(CommonInfo.Meta):
        managed = True #db에 테이블을 추가 및 삭제한다.
        db_table = 'tb_aitool' 