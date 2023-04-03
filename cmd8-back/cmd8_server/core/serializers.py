from rest_framework import serializers
from .models import AiTool

# en, ko 각각은 name과 category 하위 필드(string[])를 가지는 json이다. 
#   따라서 이들 또한, 하위 직렬화해줘야함.
class NameCategorySerializer(serializers.Serializer):
    name = serializers.ListField(child=serializers.CharField())
    category = serializers.ListField(child=serializers.CharField())


class AiToolSerializer(serializers.ModelSerializer):
    ko = NameCategorySerializer()
    en = NameCategorySerializer()

    class Meta:
        model = AiTool
        fields = ('id', 'imgUrl', 'ko', 'en')