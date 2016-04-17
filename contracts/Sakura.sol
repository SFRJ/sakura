contract Sakura {
    
    address contractCreator;
    mapping (address => company) public companies;

    struct shareHolder {
        string name;
        uint shares;
    }

    struct company {
        string _name;
        string _email;
        string _purpose;
        uint _totalAmountOfShares;
        mapping (address => shareHolder) shareHolders; 
    }
    
    function Sakura() {
       contractCreator = msg.sender;
    }
    /*
Transaction example:
Sakura.deployed().newCompany("0x1234567", "silverfloat", "team@silverfloat.com",
 "crypto trading", 1000000,["0x1234"], {from:"0x9f46a702bfb7ab306d1923132d514535da23bc2f"})
 .catch(function(e){console.error(e)}).then(function(e){console.log(e)})
*/
    function newCompany(address companyAddress, string name, string email, 
        string purpose, uint totalAmountOfShares, address[] shareHolders) returns (string) {                
        companies[companyAddress] = company({_name:name,_email:email,_purpose:purpose,
         _totalAmountOfShares:totalAmountOfShares});
        return companies[companyAddress]._name;
    }

    function getCompany(address companyAddress) returns (string,string,string,uint) {
        return (companies[companyAddress]._name, companies[companyAddress]._email, companies[companyAddress]._purpose, companies[companyAddress]._totalAmountOfShares);
    }
    
//Todo create function to return address[] this are the companies ids
//Get company information function based on company address

    function status() returns(string) {
        return "SAKURA!!!!";
    }
}