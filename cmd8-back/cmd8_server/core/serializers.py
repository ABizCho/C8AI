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
class ToolNameSerializer(AbstractBinNameSerializer):
    pass

class CategoryNameSerializer(AbstractBinNameSerializer):
    pass

class AiToolCategorySerializer(serializers.ModelSerializer):
    name_set = CategoryNameSerializer()
    class Meta:
        model = AiToolCategory
        fields = ('id', 'name_set')

class AiToolSerializer(serializers.ModelSerializer):
    name_set = ToolNameSerializer()
    categories = serializers.PrimaryKeyRelatedField(queryset=AiToolCategory.objects.all(), many=True)

    class Meta:
        model = AiTool
        fields = ('id', 'imgUrl', 'name_set', 'summary', 'redirectUrl', 'categories')
        
# class AiToolScoreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AiToolScore
#         fields = ['id', 'tool', 'user', 'score']

# class AiToolFavoriteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AiToolFavorite
#         fields = ['id', 'tool', 'user']