// Aproximaciones por porción basadas en USDA FoodData Central
const ALIMENTOS=[
["Huevo entero (1 unidad, 50 g)",72,6.3],["Arroz blanco cocido (1 taza, 158 g)",205,4.3],["Fríjol rojo cocido (1 taza, 177 g)",225,15.3],
["Lenteja cocida (1 taza, 198 g)",230,17.9],["Avena en hojuelas (½ taza seca, 40 g)",150,5.3],["Leche entera (1 vaso, 240 ml)",149,7.7],
["Leche descremada (1 vaso, 240 ml)",83,8.2],["Banano (1 mediano, 118 g)",105,1.3],["Pechuga de pollo cocida (100 g)",165,31],
["Muslo de pollo cocido (100 g)",209,26],["Atún en agua (1 lata escurrida, 120 g)",139,30],["Maní tostado (30 g)",170,7.3],
["Mantequilla de maní (2 cdas, 32 g)",190,7],["Arepa de maíz (1 mediana, 80 g)",170,3.5],["Papa cocida (1 mediana, 170 g)",147,3.2],
["Plátano maduro frito (½ unidad, 80 g)",190,1],["Plátano verde cocido (½ unidad, 90 g)",105,0.7],["Queso campesino (50 g)",140,9],
["Yogur natural (1 taza, 245 g)",149,8.5],["Pan blanco (1 tajada, 28 g)",75,2.6],["Carne de res molida cocida (100 g)",250,26],
["Hígado de res cocido (100 g)",175,27],["Sardinas en lata (1 lata, 90 g)",190,22],["Garbanzo cocido (1 taza, 164 g)",269,14.5],
["Yuca cocida (1 taza, 136 g)",180,1.5],["Pasta cocida (1 taza, 140 g)",220,8],["Aguacate (½ unidad, 100 g)",160,2],
["Panela (30 g)",115,0],["Aceite vegetal (1 cda, 14 g)",120,0],["Mazorca / maíz dulce (1 unidad, 100 g)",96,3.4]];
const E=(n,min=8,max=12)=>({n,series:3,min,max,inc:2.5});
const RUTINAS={"A - Empuje":[E("Press banca"),E("Press militar"),E("Fondos"),E("Extensión tríceps",10,15)],
"B - Tirón":[E("Remo con barra"),E("Jalón al pecho"),E("Curl bíceps",10,15),E("Face pull",12,15)],
"C - Pierna":[E("Sentadilla",6,10),E("Peso muerto rumano"),E("Prensa",10,15),E("Pantorrilla",12,20)]};
