from rest_framework import serializers
from .models import AiTool, AiToolCategory

### Abstracts
class AbstractBinNameSerializer(serializers.Serializer):
    ko = serializers.ListField(child=serializers.CharField())
    en = serializers.ListField(child=serializers.CharField())

    class Meta:
        abstract = True


### Serializers
#
class NameSerializer(AbstractBinNameSerializer):
    pass

class CategoryNameSerializer(AbstractBinNameSerializer):
    pass

# N-M관계 고려 직렬화
class AiToolCategorySerializer(serializers.ModelSerializer):
    name = CategoryNameSerializer()

    class Meta:
        model = AiToolCategory
        fields = ('id', 'name')

class AiToolSerializer(serializers.ModelSerializer):
    name = NameSerializer()
    categories = AiToolCategorySerializer(many=True)

    class Meta:
        model = AiTool
        fields = ('id', 'imgUrl', 'name', 'summary', 'redirectUrl', 'categories')