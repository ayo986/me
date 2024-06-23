local _url = 'https://ayo986.github.io/me/'
local url = _url .. 'res/images/ware/'
return {
	{text = "Aldi", expanded = true, id = 100, fileImage = _url ..'res/icons/1.png', imageSize = 30, childs = {}, bg = {10}},
	{text = "Aldi/Gemüse", expanded = true, id = 100,fileImage = nil, imageSize = 30, bg = {40},
		childs = {
			{text = 'Tomaten', fileImage = url..'1/1.png', num = 1, unit = 'kg', id = 101, type = 1},
			{text = 'Kartoffeln', fileImage = url..'1/2.png', num = 1, unit = 'sch', id = 101, type = 1},
			{text = 'Radieschen', fileImage = url..'1/3.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Knoblauch', fileImage = url..'1/4.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Karotte', fileImage = url..'1/5.png', num = 1, unit = 'kg', id = 101, type = 1},
			{text = 'Petersilie', fileImage = url..'1/6.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Paprika', fileImage = url..'1/7.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Aubergine', fileImage = url..'1/8.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Zucchini', fileImage = url..'1/9.png', num = 1, unit = 'kg', id = 101, type = 1},
			{text = 'Gurke', fileImage = url..'1/10.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Minze', fileImage = url..'1/11.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Erbsen', fileImage = url..'1/12.png', num = 1, unit = 'kg', id = 101, type = 1},
			{text = 'Zwiebel', fileImage = url..'1/13.png', num = 1, unit = 'kg', id = 101, type = 1},
			{text = 'Grüner Salat', fileImage = url..'1/14.png', num = 1, unit = 'st', id = 101, type = 1},
			{text = 'Grüner Salat', fileImage = url..'1/15.png', num = 1, unit = 'sch', id = 101, type = 1},
		}
	},
	
	{text = "Aldi/Früchte", expanded = false, id = 100,fileImage = nil, imageSize = 30, bg = {40},
		childs = {
			{text = 'gelbe Wassermelone', fileImage = url..'2/1.png', num = 1, unit = 'st', id = 101, type = 2},
			{text = 'Äpfel', fileImage = url..'2/2.png', num = 1, unit = 'kg', id = 101, type = 2},
			{text = 'Granatapfel', fileImage = url..'2/3.png', num = 1, unit = 'st', id = 101, type = 2},
			{text = 'Erdbeere', fileImage = url..'2/4.png', num = 1, unit = 'pck', id = 101, type = 2},
			{text = 'Kiwi', fileImage = url..'2/5.png', num = 1, unit = 'st', id = 101, type = 2},
			{text = 'Pfirsich', fileImage = url..'2/6.png', num = 1, unit = 'pck', id = 101, type = 2},
			{text = 'Banane', fileImage = url..'2/7.png', num = 1, unit = 'pck', id = 101, type = 2},
			{text = 'Birne', fileImage = url..'2/8.png', num = 1, unit = 'pck', id = 101, type = 2},
			{text = 'Trauben', fileImage = url..'2/9.png', num = 1, unit = 'pck', id = 101, type = 2},
			{text = 'Aprikose', fileImage = url..'2/10.png', num = 1, unit = 'pck', id = 101, type = 2},
		}
	},
	
	{text = "Aldi/Lebensmittel", expanded = false, id = 100,fileImage = nil, imageSize = 30, bg = {40},
		childs = {
			{text = 'Eier', fileImage = url..'3/1.png', num = 1, unit = 'pck', id = 101, type = 3},
			{text = 'Milch', fileImage = url..'3/2.png', num = 1, unit = 'pck', id = 101, type = 3},
			{text = 'Milch Reis', fileImage = url..'3/3.png', num = 1, unit = 'pck', id = 101, type = 3},
		}
	},
	{text = "Aldi/Getränke", expanded = false, id = 100,fileImage = nil, imageSize = 30, bg = {40},
		childs = {
			{text = 'Milch', fileImage = url..'2/1.png', num = 1, unit = 'pck', id = 101, type = 3},
			{text = 'Still Wasser', fileImage = url..'2/1.png', num = 1, unit = 'pck', id = 101, type = 3},
			{text = 'Enargie', fileImage = url..'2/1.png', num = 1, unit = 'pck', id = 101, type = 3},
		}
	}
	
}
