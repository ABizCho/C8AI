from rest_framework import serializers
from .models import AiTool, AiToolCategory, AiToolCategoryRelation

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

    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        ai_tool = AiTool.objects.create(**validated_data)
        
        for index, category in enumerate(categories_data):
            AiToolCategoryRelation.objects.create(ai_tool=ai_tool, category=category, order=index)
        
        return ai_tool
    
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