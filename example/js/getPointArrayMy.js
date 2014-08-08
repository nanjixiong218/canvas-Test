function getPointArray(mid1,mid2,begin1,begin2,direct1,direct2){
	//1号为起始图形
	//按边分16种情况：N,S,W,E代表北，南，西，东
	var code = direct1+direct2;
	var results = [];
	results.push(begin1);
	var x1=begin1.x,
		x2=begin2.x,
		y1=begin1.y,
		y2=begin2.y;

	var offset=20;
	switch(code){//一共16中组合
		case 'NN':NN();break;	
		case 'NS':NS();break;	
		case 'NW':NW();break;	
		case 'NE':NE();break;	

		case 'SN':SN();break;	
		case 'SS':SS();break;	
		case 'SW':SW();break;	
		case 'SE':SE();break;	

		case 'WN':WN();break;	
		case 'WS':WS();break;	
		case 'WW':WW();break;	
		case 'WE':WE();break;	

		case 'EN':EN();break;	
		case 'ES':ES();break;	
		case 'EW':EW();break;	
		case 'EE':EE();break;	
	}
	results.push(begin2);	
	return results;

	//判断终点在起始点的位置
	//都是在不考虑有障碍挡住的情况。
	//N方向为起始点
	function NN(){
		if(y1<y2){
			var result1 = {x:x1,y:y1-offset};	
			var result2 = {x:x2,y:y1-offset};	
			results.push(result1,result2);
		}else{
			var result1 = {x:x1,y:y2-offset};	
			var result2 = {x:x2,y:y2-offset};	
			results.push(result1,result2);
		}	
	}
	function NS(){
		if(y1>y2){//需要2个点，3条线
			var result1 = {x:x1,y:(y1+y2)/2};	
			var result2 = {x:x2,y:(y1+y2)/2};	
			results.push(result1,result2);
		}else{//需要4个点，5条线
			var result1 = {x:x1,y:y1-offset};	
			var result2 = {x:(x1+x2)/2,y:y1-offset};
			var result3 = {x:(x1+x2)/2,y:y2+offset};
			var result4 = {x:x2,y:y2+offset};
			results.push(result1,result2,result3,result4);
		}	
	}
	function NW(){//写出来之后发现，这种情况可以合并，x1<x2是一种，剩下的是一种
		if(y1>y2){
			if(x1<x2){//只需要1个点，两条线
				var result1 = {x:x1,y:y2};	
				results.push(result1);
			}else{//需要3个点，4条线
				var result1 = {x:x1,y:y1-offset};			
				var result2 = {x:x2-offset,y:y1-offset};
				var result3 = {x:x2-offset,y:y2};
				results.push(result1,result2,result3);
			}
		}else{
			var result1 = {x:x1,y:y1-offset};	
			var result2 = {x:x2-offset,y:y1-offset};
			var result3 = {x:x2-offset,y:y2};
			results.push(result1,result2,result3);
			
		}	
	}
	function NE(){//和third情况差不多只是变成x1>x2，用合并版
		if(x1>x2&&y1>y2){
			var result1 = {x:x1,y:y2};	
			results.push(result1);
		}else{
			var result1 = {x:x1,y:y1-offset};	
			var result2 = {x:x2+offset,y:y1-offset};
			var result3 = {x:x2+offset,y:y2};
			results.push(result1,result2,result3);
		}
	}
	
	//S方向为起始点
	function SN(){
		if(y1<y2){
			var result1 = {x:x1,y:(y1+y2)/2};	
			var result2 = {x:x2,y:(y1+y2)/2};	
			results.push(result1,result2);
		}else{
			var result1 = {x:x1,y:y1+offset};
			var result2 = {x:(x1+x2)/2,y:y1+offset};
			var result3 = {x:(x1+x2)/2,y:y2-offset};
			var result4 = {x:x2,y:y2-offset};
			results.push(result1,result2,result3,result4);
		}	
	}
	function SS(){

		if(y1>y2){
			var result1 = {x:x1,y:y1+offset};	
			var result2 = {x:x2,y:y1+offset};	
			results.push(result1,result2);
		}else{
			var result1 = {x:x1,y:y2+offset};	
			var result2 = {x:x2,y:y2+offset};	
			results.push(result1,result2);
		}	
	}
	function SW(){
		if(x1<x2&&y1<y2){
			var result1 = {x:x1,y:y2};	
			results.push(result1);
		}else{
			var result1 = {x:x1,y:y1+offset};	
			var result2 = {x:x2-offset,y:y1+offset};
			var result3 = {x:x2-offset,y:y2};
			results.push(result1,result2,result3);
		}
	}
	function SE(){
		if(x1>x2&&y1<y2){
			var result1 = {x:x1,y:y2};	
			results.push(result1);
		}else{
			var result1 = {x:x1,y:y1+offset};	
			var result2 = {x:x2+offset,y:y1+offset};
			var result3 = {x:x2+offset,y:y2};
			results.push(result1,result2,result3);
		}
	}
	//W方向为起始点
	function WN(){
	
		if(x1>x2&&y1<y2){
			var result1 = {x:x2,y:y1};	
			results.push(result1);
		}else{
			var result1 = {x:x1-offset,y:y1};	
			var result2 = {x:x1-offset,y:y2-offset};
			var result3 = {x:x2,y:y2-offset};
			results.push(result1,result2,result3);
		}
	}
	function WS(){
	
		if(x1>x2&&y1>y2){
			var result1 = {x:x2,y:y1};	
			results.push(result1);
		}else{
			var result1 = {x:x1-offset,y:y1};	
			var result2 = {x:x1-offset,y:y2+offset};
			var result3 = {x:x2,y:y2+offset};
			results.push(result1,result2,result3);
		}
	}
	function WW(){
		if(x1>x2){
			var result1 = {x:x2-offset,y:y1};	
			var result2 = {x:x2-offset,y:y2};	
			results.push(result1,result2);
		}else{
			var result1 = {x:x1-offset,y:y1};	
			var result2 = {x:x1-offset,y:y2};	
			results.push(result1,result2);
		}	
			
	}
	function WE(){
			
		if(x1>x2){//需要2个点，3条线
			var result1 = {x:(x1+x2)/2,y:y1};	
			var result2 = {x:(x1+x2)/2,y:y2};	
			results.push(result1,result2);
		}else{//需要4个点，5条线
			var result1 = {x:x1-offset,y:y1};	
			var result2 = {x:x1-offset,y:(y1+y2)/2};
			var result3 = {x:x2+offset,y:(y1+y2)/2};
			var result4 = {x:x2+offset,y:y2};
			results.push(result1,result2,result3,result4);
		}	
	}
	//E为起始方向
	function EN(){
	
		if(x1<x2&&y1<y2){
			var result1 = {x:x2,y:y1};	
			results.push(result1);
		}else{
			var result1 = {x:x1+offset,y:y1};	
			var result2 = {x:x1+offset,y:y2-offset};
			var result3 = {x:x2,y:y2-offset};
			results.push(result1,result2,result3);
		}
	}
	function ES(){
	
		if(x1<x2&&y1>y2){
			var result1 = {x:x2,y:y1};	
			results.push(result1);
		}else{
			var result1 = {x:x1+offset,y:y1};	
			var result2 = {x:x1+offset,y:y2+offset};
			var result3 = {x:x2,y:y2+offset};
			results.push(result1,result2,result3);
		}
	}
	function EE(){
		if(x1>x2){
			var result1 = {x:x1+offset,y:y1};	
			var result2 = {x:x1+offset,y:y2};	
			results.push(result1,result2);
		}else{
			var result1 = {x:x2+offset,y:y1};	
			var result2 = {x:x2+offset,y:y2};	
			results.push(result1,result2);
		}	
			
	}
	function EW(){
			
		if(x1<x2){//需要2个点，3条线
			var result1 = {x:(x1+x2)/2,y:y1};	
			var result2 = {x:(x1+x2)/2,y:y2};	
			results.push(result1,result2);
		}else{//需要4个点，5条线
			var result1 = {x:x1+offset,y:y1};	
			var result2 = {x:x1+offset,y:(y1+y2)/2};
			var result3 = {x:x2-offset,y:(y1+y2)/2};
			var result4 = {x:x2-offset,y:y2};
			results.push(result1,result2,result3,result4);
		}	
	}
}
