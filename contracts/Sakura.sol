contract Sakura {
    
    address contractCreator;
    mapping (address => company) public companies;
    address[] registeredCompanies;

    struct shareHolder {
        uint shares;
    }

    struct company {
        string _name;
        string _email;
        string _purpose;
        uint _totalAmountOfShares;
        mapping (address => shareHolder) _shareHolders;
        address[] _shareHoldersList; 
    }
    
    function Sakura() {
       contractCreator = msg.sender;
    }
    /*
Transactions write into blockchain

Transaction example:
Sakura.deployed().newCompany("0x1234567", "silverfloat", "team@silverfloat.com",
 "crypto trading", 1000000,["0x1234"], {from:"0x9f46a702bfb7ab306d1923132d514535da23bc2f",gas:3100000})
 .catch(function(e){console.error(e)}).then(function(e){console.log(e)})
*/
    function newCompany(address companyAddress, string name, string email, 
        string purpose, uint totalAmountOfShares, address[] shareHolders) returns (string) {                
        companies[companyAddress] = company({_name:name,_email:email,_purpose:purpose,
         _totalAmountOfShares:totalAmountOfShares, _shareHoldersList:shareHolders});
        registeredCompanies.push(companyAddress);
        for(uint i = 0; i<shareHolders.length; i++) {
            companies[companyAddress]._shareHolders[shareHolders[i]] = shareHolder(0);
        }
        return companies[companyAddress]._name;
    }

   
/*
Calls read from blockchain

    Call example
    Sakura.deployed().getCompany.call("0x1234567").catch(function(e){console.error(e)}).then(function(e){console.log(e)})
*/
    function getCompany(address companyAddress) returns (string,string,string,uint) {
        return (companies[companyAddress]._name, companies[companyAddress]._email, companies[companyAddress]._purpose, companies[companyAddress]._totalAmountOfShares);
    }

    function getCompanyShareholders(address companyAddress) returns(address[],uint[]){
        uint numberOfShareHolders = companies[companyAddress]._shareHoldersList.length;
        address[] memory addresses = new address[](numberOfShareHolders);
        uint[] memory balances = new uint[](numberOfShareHolders);

        for (uint i = 0; i < numberOfShareHolders; i++) {
            address shareHolderAddress = companies[companyAddress]._shareHoldersList[i];
            addresses[i] = shareHolderAddress;
            balances[i] = (companies[companyAddress]._shareHolders[shareHolderAddress].shares);    
        }
        return (addresses, balances);
    }
    
//Todo create function to return address[] this are the companies ids
//Get company information function based on company address

    function getAllCompanies() returns (address[]){
        return registeredCompanies;
    }

    function getCompanyCount() returns (uint) {
        return registeredCompanies.length;
    }

    function distributeShares(address company) {
        for(uint i = 0; i<companies[company]._shareHoldersList.length; i++) {
            companies[company]._shareHolders[companies[company]._shareHoldersList[i]].shares+=10;
            companies[company]._totalAmountOfShares-=10;
        }
    }

    function status() returns(string) {
        return "SAKURA!!!!";
    }

    function transfer(address companyAddress, address fromAddress, address toAddress, uint amount) {
        companies[companyAddress]._shareHolders[fromAddress].shares -= amount;
        companies[companyAddress]._shareHolders[toAddress].shares += amount;
    }
}