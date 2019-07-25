wx.onMessage(function(data){
    console.log("@@@@@@@@@@@@wx.onmessage" + JSON.stringify(data));
    switch(data.id)
    {
        case 0:
            wx.getUserCloudStorage({
                keyList: ["username","person_total_money"],

                success: function (res){
                    console.log("@@@@@@@@@@@@@@@@@:" + JSON.stringify(res));
                }
            });
        break;
        case 1:
            
        break;
    }
});