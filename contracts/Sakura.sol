contract Sakura {
    
    address contractCreator;
    mapping (address => company) public companies;
    mapping (address => bool) alreadyRegisteredCompanies;
    
    struct company {
        string _name;
        string _email;
        string _purpose;
        address[] _shareHolders;
        uint _totalAmountOfShares;
        mapping (address => bool) alreadyRegisteredShareholders;
    }
    
    function Sakura() {
       contractCreator = msg.sender;
    }

    function newCompany(address companyAddress,string name, string email,string 
         purpose,address[] shareHolders, uint totalAmountOfShares)
             validateCompanyAlreadyExists(companyAddress) {
                 
        companies[companyAddress] = company({_name:name,_email:email,_purpose:purpose,
        _shareHolders:shareHolders,_totalAmountOfShares:totalAmountOfShares});
        alreadyRegisteredCompanies[companyAddress]=true;
    }
    
    //This modifier checks if the company is already registered
    modifier validateCompanyAlreadyExists(address addressToCheck) {
        if(alreadyRegisteredCompanies[addressToCheck])
            throw;
    }
    
    function addShareHolder(address companyAddress, address shareHolderAddress) {
        
    }
    
    function status() returns(string) {
        return "SAKURA!!!!";
    }
}