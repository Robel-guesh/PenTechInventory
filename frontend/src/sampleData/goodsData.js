import icon from "../assets/logo.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
const goodsData = [
  {
    _id: "1",
    name: "Laptop",
    unitOfMeasureId: "Piece",
    Qty: 10,
    photo: image1, // No quotes around the image source, assuming you have image imports
    category: "Electronics",
    description: "A powerful laptop.",
    shortageLevel: 5,
  },
  {
    _id: "2",
    name: "T-shirt",
    unitOfMeasureId: "Piece",
    Qty: 50,
    photo: image2,
    category: "Clothing",
    description: "A comfortable cotton t-shirt.",
    shortageLevel: 20,
  },
  {
    _id: "3",
    name: "Apple",
    unitOfMeasureId: "Kilogram",
    Qty: 100,
    photo: image3,
    category: "Groceries",
    description: "Fresh red apples.",
    shortageLevel: 30,
  },
  {
    _id: "4",
    name: "Sofa",
    unitOfMeasureId: "Piece",
    Qty: 5,
    photo: image4,
    category: "Furniture",
    description: "Comfortable leather sofa.",
    shortageLevel: 2,
  },
  {
    _id: "5",
    name: "Action Figure",
    unitOfMeasureId: "Piece",
    Qty: 200,
    photo: image5,
    category: "Toys",
    description: "Plastic action figure toy.",
    shortageLevel: 50,
  },
  {
    _id: "6",
    name: "Smartphone",
    unitOfMeasureId: "Piece",
    Qty: 30,
    photo: image1,
    category: "Electronics",
    description: "Latest model smartphone.",
    shortageLevel: 10,
  },
  {
    _id: "7",
    name: "Jeans",
    unitOfMeasureId: "Piece",
    Qty: 70,
    photo: image2,
    category: "Clothing",
    description: "Stylish blue jeans.",
    shortageLevel: 25,
  },
  {
    _id: "8",
    name: "Banana",
    unitOfMeasureId: "Kilogram",
    Qty: 120,
    photo: image3,
    category: "Groceries",
    description: "Fresh bananas.",
    shortageLevel: 40,
  },
  {
    _id: "9",
    name: "Chair",
    unitOfMeasureId: "Piece",
    Qty: 15,
    photo: image4,
    category: "Furniture",
    description: "Wooden dining chair.",
    shortageLevel: 5,
  },
  {
    _id: "10",
    name: "Lego Set",
    unitOfMeasureId: "Piece",
    Qty: 50,
    photo: image5,
    category: "Toys",
    description: "Building block toy set.",
    shortageLevel: 15,
  },
  {
    _id: "11",
    name: "Headphones",
    unitOfMeasureId: "Piece",
    Qty: 25,
    photo: image1,
    category: "Electronics",
    description: "Noise-cancelling headphones.",
    shortageLevel: 5,
  },
  {
    _id: "12",
    name: "Jacket",
    unitOfMeasureId: "Piece",
    Qty: 40,
    photo: image2,
    category: "Clothing",
    description: "Warm winter jacket.",
    shortageLevel: 10,
  },
  {
    _id: "13",
    name: "Orange",
    unitOfMeasureId: "Kilogram",
    Qty: 150,
    photo: image3,
    category: "Groceries",
    description: "Juicy oranges.",
    shortageLevel: 60,
  },
  {
    _id: "14",
    name: "Bed",
    unitOfMeasureId: "Piece",
    Qty: 10,
    photo: image4,
    category: "Furniture",
    description: "Comfortable queen-size bed.",
    shortageLevel: 3,
  },
  {
    _id: "15",
    name: "Doll",
    unitOfMeasureId: "Piece",
    Qty: 100,
    photo: image5,
    category: "Toys",
    description: "Cute doll for kids.",
    shortageLevel: 30,
  },
  {
    _id: "16",
    name: "Laptop Sleeve",
    unitOfMeasureId: "Piece",
    Qty: 45,
    photo: image1,
    category: "Electronics",
    description: "Protective sleeve for laptops.",
    shortageLevel: 12,
  },
  {
    _id: "17",
    name: "Towel",
    unitOfMeasureId: "Piece",
    Qty: 60,
    photo: image2,
    category: "Clothing",
    description: "Soft cotton towel.",
    shortageLevel: 20,
  },
  {
    _id: "18",
    name: "Grapes",
    unitOfMeasureId: "Kilogram",
    Qty: 200,
    photo: image3,
    category: "Groceries",
    description: "Fresh green grapes.",
    shortageLevel: 50,
  },
  {
    _id: "19",
    name: "Table",
    unitOfMeasureId: "Piece",
    Qty: 20,
    photo: image4,
    category: "Furniture",
    description: "Wooden dining table.",
    shortageLevel: 8,
  },
  {
    _id: "20",
    name: "Train Set",
    unitOfMeasureId: "Piece",
    Qty: 30,
    photo: image5,
    category: "Toys",
    description: "Toy train set for kids.",
    shortageLevel: 15,
  },
  {
    _id: "21",
    name: "Camera",
    unitOfMeasureId: "Piece",
    Qty: 18,
    photo: image1,
    category: "Electronics",
    description: "Digital camera with high resolution.",
    shortageLevel: 6,
  },
  {
    _id: "22",
    name: "Sweater",
    unitOfMeasureId: "Piece",
    Qty: 55,
    photo: image2,
    category: "Clothing",
    description: "Cozy wool sweater.",
    shortageLevel: 12,
  },
  {
    _id: "23",
    name: "Pineapple",
    unitOfMeasureId: "Kilogram",
    Qty: 80,
    photo: image3,
    category: "Groceries",
    description: "Sweet tropical pineapples.",
    shortageLevel: 30,
  },
  {
    _id: "24",
    name: "Lamp",
    unitOfMeasureId: "Piece",
    Qty: 25,
    photo: image4,
    category: "Furniture",
    description: "Desk lamp with adjustable brightness.",
    shortageLevel: 10,
  },
  {
    _id: "25",
    name: "Toy Car",
    unitOfMeasureId: "Piece",
    Qty: 100,
    photo: image5,
    category: "Toys",
    description: "Small plastic toy car.",
    shortageLevel: 40,
  },
  {
    _id: "26",
    name: "Watch",
    unitOfMeasureId: "Piece",
    Qty: 50,
    photo: image1,
    category: "Electronics",
    description: "Stylish wristwatch with leather band.",
    shortageLevel: 15,
  },
  {
    _id: "27",
    name: "Scarf",
    unitOfMeasureId: "Piece",
    Qty: 75,
    photo: image2,
    category: "Clothing",
    description: "Warm knitted scarf.",
    shortageLevel: 20,
  },
  {
    _id: "28",
    name: "Lemon",
    unitOfMeasureId: "Kilogram",
    Qty: 130,
    photo: image3,
    category: "Groceries",
    description: "Fresh lemons.",
    shortageLevel: 45,
  },
  {
    _id: "29",
    name: "Cupboard",
    unitOfMeasureId: "Piece",
    Qty: 8,
    photo: image4,
    category: "Furniture",
    description: "Wooden cupboard for storage.",
    shortageLevel: 4,
  },
  {
    _id: "30",
    name: "Building Blocks",
    unitOfMeasureId: "Piece",
    Qty: 90,
    photo: image5,
    category: "Toys",
    description: "Colorful building blocks for kids.",
    shortageLevel: 25,
  },
  {
    _id: "31",
    name: "Keyboard",
    unitOfMeasureId: "Piece",
    Qty: 15,
    photo: image1,
    category: "Electronics",
    description: "Mechanical keyboard with RGB lights.",
    shortageLevel: 5,
  },
  {
    _id: "32",
    name: "Boots",
    unitOfMeasureId: "Piece",
    Qty: 40,
    photo: image2,
    category: "Clothing",
    description: "good loking ",
  },
];
function getGoodsData() {
  return goodsData;
}
export default getGoodsData;