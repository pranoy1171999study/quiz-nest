import { BaseQuestion, McqQuestion, MsqQuestion, TrueFalseQuestion } from './question-models';
import { MediaItem } from './media-models';
import { QuestionType } from './enums';

export const demoQuestions: BaseQuestion[] = [
  {
    id: 'q3',
    questionText: 'The sky is blue.',
    type: QuestionType.TrueFalse,
    correctAnswer: true,
  } as TrueFalseQuestion,
];

export const demoMedias = {
  images: [
    {
      "id": "1a2b3c4d-1111-2222-3333-444455556666",
      "name": "Beautiful Mountains",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "altText": "snow-covered mountains"
    },
    {
      "id": "2b3c4d5e-2222-3333-4444-555566667777",
      "name": "City at Night",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "altText": "night city lights"
    },
    {
      "id": "3c4d5e6f-3333-4444-5555-666677778888",
      "name": "Forest Path",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "altText": "path through the forest"
    },
    {
      "id": "4d5e6f70-4444-5555-6666-777788889999",
      "name": "Ocean Sunset",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      "altText": "sunset over the ocean"
    },
    {
      "id": "5e6f7081-5555-6666-7777-888899990000",
      "name": "Desert Dunes",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "altText": "sand dunes in the desert"
    },
    {
      "id": "6f708192-6666-7777-8888-999900001111",
      "name": "Lake Reflection",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "altText": "mountain reflection in lake"

    },
    {
      "id": "708192a3-7777-8888-9999-000011112222",
      "name": "Hot Air Balloons",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1501426026826-31c667bdf23d",
      "altText": "hot air balloons in the sky"
    },
    {
      "id": "8192a3b4-8888-9999-0000-111122223333",
      "name": "Aurora Borealis",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1506898666132-2b58f36bcd00",
      "altText": "northern lights over a lake"
    },
    {
      "id": "92a3b4c5-9999-0000-1111-222233334444",
      "name": "Wildflowers",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      "altText": "field of wildflowers"
    },
    {
      "id": "a3b4c5d6-0000-1111-2222-333344445555",
      "name": "Old Library",
      "type": "IMAGE",
      "url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
      "altText": "interior of an old library"
    }
  ],
  videos: [
  {
    "id": "uuid-001",
    "name": "Big Buck Bunny",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "thumbnailUrl": "images/BigBuckBunny.jpg"
  },
  {
    "id": "uuid-002",
    "name": "Elephant Dream",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "thumbnailUrl": "images/ElephantsDream.jpg"
  },
  {
    "id": "uuid-003",
    "name": "For Bigger Blazes",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "thumbnailUrl": "images/ForBiggerBlazes.jpg"
  },
  {
    "id": "uuid-004",
    "name": "For Bigger Escape",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "thumbnailUrl": "images/ForBiggerEscapes.jpg"
  },
  {
    "id": "uuid-005",
    "name": "For Bigger Fun",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "thumbnailUrl": "images/ForBiggerFun.jpg"
  },
  {
    "id": "uuid-006",
    "name": "For Bigger Joyrides",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "thumbnailUrl": "images/ForBiggerJoyrides.jpg"
  },
  {
    "id": "uuid-007",
    "name": "For Bigger Meltdowns",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "thumbnailUrl": "images/ForBiggerMeltdowns.jpg"
  },
  {
    "id": "uuid-008",
    "name": "Sintel",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "thumbnailUrl": "images/Sintel.jpg"
  },
  {
    "id": "uuid-009",
    "name": "Subaru Outback On Street And Dirt",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "thumbnailUrl": "images/SubaruOutbackOnStreetAndDirt.jpg"
  },
  {
    "id": "uuid-010",
    "name": "Tears of Steel",
    "type": "VIDEO",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "thumbnailUrl": "images/TearsOfSteel.jpg"
  }
]

}