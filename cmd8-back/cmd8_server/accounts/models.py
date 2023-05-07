from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import Group, Permission

YN_CHOICES = [
    ('Y', "예"),
    ('N', "아니오"),
]

class User(AbstractUser):
    STATUS_CHOICES = [
        ('N', "정상"),
        ('R', "휴면"),
        ('S', "정지"),
    ]
    GENDER_CHOICES = [
        ('M', "남자"),
        ('F', "여자"),
        ('N', "무응답"),
    ]
    
    username = models.CharField(verbose_name="계정명", max_length=150, unique=True, default="user123")
    nickname = models.CharField(verbose_name="닉네임", max_length=100)
    status = models.CharField(verbose_name="계정 상태", max_length=1, choices=STATUS_CHOICES, default="N", blank=True)
    gender = models.CharField(verbose_name="성별", max_length=1, choices=GENDER_CHOICES, default="N", blank=True, null=True)
    birth_date = models.DateField(verbose_name="생년월일", blank=True, null=True)
    phone_num = PhoneNumberField(verbose_name="핸드폰번호", default="+8210-0000-0000",unique=True)
    svc_use_pcy_agmt = models.CharField(verbose_name="서비스이용약관동의여부", max_length=1, choices=YN_CHOICES, default="N")
    ps_info_proc_agmt = models.CharField(verbose_name="개인정보처리방침동의여부", max_length=1, choices=YN_CHOICES, default="N")
    mkt_info_recv_agmt = models.CharField(verbose_name="마케팅정보수신동의여부", max_length=1, choices=YN_CHOICES, default="N")
    created_at = models.DateTimeField(verbose_name="계정 생성시간", auto_now_add=True)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nickname