function commit(snapshot,t,thID){
    var num = snapshot.key;
    var re = 'error';
    var data = snapshot.val();
    var type = data.type;
    var dbName = data.name;
    var contref = db.ref('bbs/conts/' + thID + '/' + num);
    var ID = snapshot.key;
    if(type == "comment"){
        if(dbName == name&& t==undefined){
            var cont = data.cont;
            var res = resset(cont);
            cont = urlre(cont);

            
            var num = data.num;
            var time = data.time;
            if(t="t"){
                if(res){
                    re = num + ' | '  + dbName + ' | ' + time + '<br><div class="my"><div class="card d-inline-block p-2 text-dark " style="text-align: left;">'+ anc(res,thID)+ '<br></div><br>' + cont + '<br><a href="javascript:remove('+ num +')" class="btn btn-primary btn-sm">レスを削除</a></div>'
                }else{
                    re = num + ' | '  + dbName + ' | ' + time + '<br><div class="my"><br>' + cont + '<br><a href="javascript:remove('+ num +')" class="btn btn-primary btn-sm">レスを削除</a></div>'
                }
            }else{
                if(res){
                    re = '<li class="chatlist" style="text-align: right;">'+ num + ' | '  + dbName + ' | ' + time + '<br><div class="my"><div class="card d-inline-block p-2 text-dark" style="text-align: left;">'+ anc(res,thID)+ '</div>' + cont + '<br><a href="javascript:remove('+ num +')" class="btn btn-primary btn-sm">レスを削除</a></div></li>'
                }else{
                    re = '<li class="chatlist" style="text-align: right;">'+ num + ' | '  + dbName + ' | ' + time + '<br><div class="my">' + cont + '<br><a href="javascript:remove('+ num +')" class="btn btn-primary btn-sm">レスを削除</a></div></li>'
                }
            }
        }else{
            var cont = data.cont;
            var res = resset(cont);
            cont = cont.replace(/(>>[1-9]\d*)/g,"<a class='anc'>" + "$1" + "</a>");
            cont = urlre(cont);
            var num = data.num;
            var time = data.time;
            if(t ="t"){
            if(res){
                re = num + " | " + dbName + " | " + time + '<br><div class="chat"><div class="card d-inline-block p-2">'+ anc(res,thID)+ '</div><br>' + cont + '</div>';
            }else{
                re = num + " | " + dbName + " | " + time + '<br><div class="chat">' + cont + '</div>';
            }
            }else{
                if(res){
                re = '<li class="chatlist">'+ num + " | " + dbName + " | " + time + '<br><div class="chat"><div class="card d-inline-block p-2"">'+ anc(res,thID)+ '</div><br>' + cont + '</div></li>';
            }else{
                re = '<li class="chatlist">'+ num + " | " + dbName + " | " + time + '<br><div class="chat">' + cont + '</div></li>';
            }
            }
        }
    }else if(type == "removed"){
        var num = data.num;
        var time = data.time;
        if(t="t"){
            re = '<div class="announce">'+ num + ' | ' +'このレスは削除されました</div>';
        }else{
            re = '<li class="text-center" class="chatlist"><div class="announce">'+ num + ' | ' +'このレスは削除されました</div></li>';
        }
    }else if(type == "enter"){
        var dbName = data.name;
        var num = data.num;
        var time = data.time;
        if(t="t"){
            re = '<div class="announce">'+ num + ' | ' + dbName + 'さんが入室しました | ' + time + '</div>';
        }else{
            re = '<li class="text-center"><div class="announce">'+ num + ' | ' + dbName + 'さんが入室しました | ' + time + '</div></li>';
        }
    }
    if(t = "t"){}else{
        if(num){
        count = num;
    }
    }
    return re
}

function urlre(cont){
    cont = cont.replace(/((?<!href="|href='|src="|src=')(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' class='thumb'>$1</a>");
    return cont
}

function resset(cont){
    var res
    if(cont.match(/>>[1-9]\d*/i)){
        res = cont.match(/>>[1-9]\d*/gi)[0].replace(/>>/, "");
    }
    return res
}

function anc(num,thID){
    var cont;
    var ancref = db.ref('bbs/conts/' + thID + '/' + num);
    var t = "t"
    ancref.once('value',(snapshot)=>{  
        cont = commit(snapshot,t,thID);
    });
    return cont;
}