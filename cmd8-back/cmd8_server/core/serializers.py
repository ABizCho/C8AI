# from rest_framework import serializers
# from .models import AiTool, AiToolCategory

# ### Abstracts
# class AbstractBinNameSerializer(serializers.Serializer):
#     ko = serializers.ListField(child=serializers.CharField())
#     en = serializers.ListField(child=serializers.CharField())

#     class Meta:
#         abstract = True


# ### Serializers
# #
# class NameSerializer(AbstractBinNameSerializer):
#     pass

# class CategoryNameSerializer(AbstractBinNameSerializer):
#     pass

# # N-M관계 고려 직렬화
# class AiToolCategorySerializer(serializers.ModelSerializer):
#     name = CategoryNameSerializer()

#     class Meta:
#         model = AiToolCategory
#         fields = ('id', 'name')

# class AiToolSerializer(serializers.ModelSerializer):
#     name = NameSerializer()
#     categories = AiToolCategorySerializer(many=True)

#     class Meta:
#         model = AiTool
#         fields = ('id', 'imgUrl', 'name', 'summary', 'redirectUrl', 'categories')


from rest_framework import serializers
from .models import AiTool, AiToolCategory

class NameCategorySerializer(serializers.Serializer):
    ko = serializers.ListField(child=serializers.CharField())
    en = serializers.ListField(child=serializers.CharField())

class AiToolCategorySerializer(serializers.ModelSerializer):
    name = NameCategorySerializer()

    class Meta:
        model = AiToolCategory
        fields = ('id', 'name')

class AiToolSerializer(serializers.ModelSerializer):
    ko = NameCategorySerializer()
    en = NameCategorySerializer()
    categories = AiToolCategorySerializer(many=True, read_only=True)

    class Meta:
        model = AiTool
        fields = ('id', 'imgUrl', 'ko', 'en', 'summary', 'redirectUrl', 'categories')

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Reformat the data to match the client's expected interface
        ko_names = data['ko']['name']
        en_names = data['en']['name']
        ko_categories = []
        en_categories = []

        for category in data['categories']:
            ko_categories.extend(category['ko']['category'])
            en_categories.extend(category['en']['category'])

        data['ko'] = {'name': ko_names, 'category': ko_categories}
        data['en'] = {'name': en_names, 'category': en_categories}
        del data['categories']

        return data