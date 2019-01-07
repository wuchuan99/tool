
var CacheMangement = function() {
    var PREFIX = "yyrun_";
    var SAVEDKEYS = "yycache_keys";
    var EXPIRY_UNITS = 60 * 1000;

    this.get = function(keyName, defaultValue) {
            var completeName = PREFIX + keyName;
            var cacheObj = JSON.parse(localStorage.getItem(completeName));

            var backupValue = defaultValue || null;
            if (cacheObj) {   

                // 检查userId是否过期, 如果超过8小时, 则过期
                if (keyName == "userId" && checkExpire(cacheObj)) {
                    this.flush();
                    return null;
                } 

                return cacheObj.value || backupValue; 
            }
            else {
                return backupValue;
            }
    }

    this.set = function(keyName, value) { 
        var completeName = PREFIX + keyName;
        if (value) {
            var cacheObj = { 
                key : completeName,
                value: value, 
                timestamp: new Date().toString()
            } 

            localStorage.setItem(completeName,  JSON.stringify(cacheObj));
            addSavedKey(completeName);
        }
        else {
            localStorage.removeItem(completeName);
        }
    }

    this.remove = function(keyName) {
        var completeName = PREFIX + keyName;
        localStorage.removeItem(completeName);
    }

    this.flush = function() {
        var savedKeys = getSavedKeys();
        // 从缓存中删除添加过的键值
        savedKeys.forEach((itemName) => {
            localStorage.removeItem(itemName);
        });

        clearSavedKeys();

        return true;
    }

    function checkExpire(cacheObj) {
        if (cacheObj) { 
            var dateString = cacheObj.timestamp;
            var now = new Date().toString()

            //比较时间
            var pastMinute = compareMinutes(now, dateString);
            //console.log(pastMinute);
            if (pastMinute >= 480) {
                // 超过8小时 
                console.log("登录状态已过期.")
                return true;
            }
            else {
                return false;
            }
        }
        
        return true;
    }

    /* 比较两个日期相差的分钟数
    ********************************************/
    function compareMinutes(lastTime, firstTime) {
        
        var lt = new Date(lastTime);
        var ft = new Date(firstTime); 
        
        var diffMs = (lt - ft); 
        var diffMins = Math.floor((diffMs/1000)/60);
        
        return diffMins;
    }

    function addSavedKey(keyName) {
        var keyArray = getSavedKeys();
        
        // 添加新的键
        keyArray.push(keyName);

        // 保存到缓存
        localStorage.setItem(SAVEDKEYS, JSON.stringify(keyArray));
    }

    function getSavedKeys() {
        var keyArray = localStorage.getItem(SAVEDKEYS);
        if (keyArray){
            keyArray =  JSON.parse(keyArray);
        }
        else {
            keyArray = [];
        }

        return keyArray;
    }

    function clearSavedKeys() {
        localStorage.removeItem(SAVEDKEYS);
    }
    
};

var yyCache  = yyCache || new CacheMangement();
