from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage

from .models import AiTool, AiToolCategory
from .serializers import AiToolSerializer, AiToolCategorySerializer
import os 

##### AI TOOL ##### 
import json

@api_view(['POST'])
@csrf_exempt
def create_aiTool(request):
    try:
        data = json.loads(request.POST['data'])
        image = request.FILES['image']
        image_extension = os.path.splitext(image.name)[1]
        image_name = data['name_set']['en'][0] + image_extension

        # 이미지를 S3에 업로드하고 이미지 URL 가져오기
        default_storage.save(f'ai_tools/{image_name}', image)
        image_url = default_storage.url(f'ai_tools/{image_name}')

        # 이미지 URL을 요청 데이터에 추가하기
        data['imgUrl'] = image_url

        serializer = AiToolSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
       return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@csrf_exempt
def get_aiTool(request, pk):
    try:
        ai_tool = AiTool.objects.prefetch_related('categories').get(pk=pk)
        serializer = AiToolSerializer(ai_tool)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except AiTool.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#### safe=True(=default)였기에 딕셔너리가 아닌 직렬화 오류가 발생했었다.
#### err: In order to allow non-dict objects to be serialized set the safe parameter to False.
#### 해결법2 적용 해결했음 ( django 권장 해결법), 1번 대안은 safe=False 설정이었음
@api_view(['GET'])
@csrf_exempt
def get_all_aiTools(request):
    try:
        ai_tools = AiTool.objects.prefetch_related('categories').all() #prefetch사용해서 성능향상 도모: 어차피 메인페이지 항상 함께씀
        if not ai_tools:
            raise AiTool.DoesNotExist
        serializer = AiToolSerializer(ai_tools, many=True)#직렬화
        serialized_data = serializer.data
        return JsonResponse({'aiTools': serialized_data}, status=status.HTTP_200_OK)
    except AiTool.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@csrf_exempt
def get_all_aiTools_combinedCats(request):
    try:
        ai_tools = AiTool.objects.prefetch_related('categories').all()
        if not ai_tools:
            raise AiTool.DoesNotExist
        serializer = AiToolSerializer(ai_tools, many=True)
        serialized_data = serializer.data
        
        # AiToolCategory를 한번에 가져와 ID를 기준으로 사전에 저장 : 성능개선용 (DB쿼리 수 감소)
        all_categories = AiToolCategory.objects.all()
        category_dict = {category.id: category for category in all_categories}

        # 프론트-메인코어 인터페이스 맞게 가공
        transformed_data = []
        for ai_tool in serialized_data:
            category_ids = ai_tool['categories']
            categories_ko = []
            categories_en = []
            
            for category_id in category_ids:
                category = category_dict[category_id]
                categories_ko.append(category.name_set['ko'][0])
                categories_en.append(category.name_set['en'][0])
            
            transformed_data.append({
                'id': ai_tool['id'],
                'imgUrl': ai_tool['imgUrl'],
                'ko': {
                    'name': ai_tool['name_set']['ko'],
                    'category': categories_ko,
                },
                'en': {
                    'name': ai_tool['name_set']['en'],
                    'category': categories_en,
                },
                'summary': ai_tool['summary'],
                'redirectUrl': ai_tool['redirectUrl'],
            })
        
        return JsonResponse({'aiTools': transformed_data}, status=status.HTTP_200_OK)
    except AiTool.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
####################


##### CATEGORY #####

@api_view(['POST'])
@csrf_exempt
def create_aiTool_category(request):
    try:
        data = request.data
        serializer = AiToolCategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@csrf_exempt
def get_aiTool_category(request, pk):
    try:
        ai_tool_category = AiToolCategory.objects.get(pk=pk)
        serializer = AiToolCategorySerializer(ai_tool_category)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except AiToolCategory.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@csrf_exempt
def get_all_aiTool_categories(request):
    try:
        ai_tool_categories = AiToolCategory.objects.all()
        if not ai_tool_categories:
            raise AiToolCategory.DoesNotExist
        serializer = AiToolCategorySerializer(ai_tool_categories, many=True)
        serialized_data = serializer.data
        return JsonResponse({'aiToolCategories': serialized_data}, status=status.HTTP_200_OK)
    except AiToolCategory.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Uncomment the following code if you want to use AiToolScore and AiToolFavorite based on User model

# from .serializers import AiToolScoreSerializer, AiToolFavoriteSerializer
# from .models import AiToolScore, AiToolFavorite

# @api_view(['GET'])
# @csrf_exempt
# def get_all_ai_tool_scores(request):
#     try:
#         ai_tool_scores = AiToolScore.objects.all()
#         if not ai_tool_scores:
#             raise AiToolScore.DoesNotExist
#         serializer = AiToolScoreSerializer(ai_tool_scores, many=True)
#         serialized_data = serializer.data
#         return JsonResponse({'aiToolScores': serialized_data}, status=status.HTTP_200_OK)
#     except AiToolScore.DoesNotExist:
#         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['GET'])
# @csrf_exempt
# def get_all_ai_tool_favorites(request):
#     try:
#         ai_tool_favorites = AiToolFavorite.objects.all()
#         if not ai_tool_favorites:
#             raise AiToolFavorite.DoesNotExist
#         serializer = AiToolFavoriteSerializer(ai_tool_favorites, many=True)
#         serialized_data = serializer.data
#         return JsonResponse({'aiToolFavorites': serialized_data}, status=status.HTTP_200_OK)
#     except AiToolFavorite.DoesNotExist:
#         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
