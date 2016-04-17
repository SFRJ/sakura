// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"status","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"companies","outputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_purpose","type":"string"},{"name":"_totalAmountOfShares","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getAllCompanies","outputs":[{"name":"","type":"address[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"companyAddress","type":"address"}],"name":"getCompanyShareholders","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"type":"function"},{"constant":false,"inputs":[{"name":"companyAddress","type":"address"}],"name":"getCompany","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"company","type":"address"}],"name":"distributeShares","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getCompanyCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"companyAddress","type":"address"},{"name":"fromAddress","type":"address"},{"name":"toAddress","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"companyAddress","type":"address"},{"name":"name","type":"string"},{"name":"email","type":"string"},{"name":"purpose","type":"string"},{"name":"totalAmountOfShares","type":"uint256"},{"name":"shareHolders","type":"address[]"}],"name":"newCompany","outputs":[{"name":"","type":"string"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a03191633179055610ee6806100246000396000f3606060405236156100775760e060020a6000350463200d2ed28114610079578063355e6ce8146100c1578063408bf4c3146100e8578063409ef6391461015857806362bc56e6146102a65780639bafaaa414610350578063f0782640146103e6578063f18d03cc146103f1578063fcc0c90914610441575b005b61061a604080516020818101835260009091528151808301909252600a82527f53414b5552412121212100000000000000000000000000000000000000000000908201525b90565b60016020819052600435600090815260409020600381015461068892820190600283019084565b61081160408051602081810183526000825282516002805480840283018401909552848252929390929183018282801561014c57602002820191906000526020600020905b8154600160a060020a031681526001919091019060200180831161012d575b505050505090506100be565b61085b60043560408051602081810183526000808352835180830185528181528451808401865282815285518085018752838152600160a060020a03881684526001909452855195832060050154949591949390929091819085908059106101bd5750595b90808252806020026020018201604052509350846040518059106101de5750595b90808252806020026020018201604052509250600091505b84821015610ed557600160a060020a03881660009081526001602052604090206005018054839081101561000257906000526020600020900160009054906101000a9004600160a060020a031690508084838151811015610002576020818102909201820192909252600160a060020a038a1660009081526001825260408082208583526004019092522054845190918591811015610002575050602083810285010152600191909101906101f6565b6108e0600435604080516020818101835260008083528351808301855281815284518084018652828152600160a060020a038716835260018085528684206003810154815489516002828616156101000260001901909216829004601f81018a90048a0282018a01909b528a815298999598949792959386019490860193919290918691830182828015610da15780601f10610d7657610100808354040283529160200191610da1565b61007760043560005b600160a060020a038216600090815260016020526040902060050154811015610ee25760406000908120600581018054600a936004939093019291908590811015610002575060408083209183526020808420870154600160a060020a03908116855294815290832080549095019094559185169052600191829052600301805460091901905501610359565b610a136002546100be565b600160a060020a0360048035821660009081526001602090815260408083206024358616845290930190528181208054606435908190039091556044359390931681522080549091019055610077565b60408051602060046024803582810135601f810185900485028601850190965285855261061a9583359593946044949392909201918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976084979196506024919091019450909250829150840183828082843750506040805160a435808a013560208181028481018201909552818452989a9935999860c4985092965060249190910194509250829190850190849080828437509496505050505050506020604051908101604052806000815260200150600060a06040519081016040528088815260200187815260200186815260200185815260200184815260200150600160005060008a600160a060020a031681526020019081526020016000206000506000820151816000016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a2557805160ff19168380011785555b50610a559291505b80821115610ab45760008155600101610606565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561067a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6040805160608101839052608080825286546002600182161561010002600019019091160490820181905290918291602083019183019060a0840190899080156107135780601f106106e857610100808354040283529160200191610713565b820191906000526020600020905b8154815290600101906020018083116106f657829003601f168201915b5050848103835287546002600182161561010002600019019091160480825260209190910190889080156107885780601f1061075d57610100808354040283529160200191610788565b820191906000526020600020905b81548152906001019060200180831161076b57829003601f168201915b5050848103825286546002600182161561010002600019019091160480825260209190910190879080156107fd5780601f106107d2576101008083540402835291602001916107fd565b820191906000526020600020905b8154815290600101906020018083116107e057829003601f168201915b505097505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f1509050019250505060405180910390f35b6040518080602001806020018381038352858181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f1509050018381038252848181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f15090500194505050505060405180910390f35b604051808060200180602001806020018581526020018481038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561094e5780820380516001836020036101000a031916815260200191505b508481038352878181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156109a75780820380516001836020036101000a031916815260200191505b508481038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610a005780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b60408051918252519081900360200190f35b828001600101855582156105fe579182015b828111156105fe578251826000505591602001919060010190610a37565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ab857805160ff19168380011785555b50610ae8929150610606565b5090565b82800160010185558215610aa8579182015b82811115610aa8578251826000505591602001919060010190610aca565b50506040820151816002016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4757805160ff19168380011785555b50610b77929150610606565b82800160010185558215610b3b579182015b82811115610b3b578251826000505591602001919060010190610b59565b5050606082015160038201556080820151805160058301805482825560008281526020908190209294918301939291018215610be0579160200282015b82811115610be05782518254600160a060020a0319161782556020929092019160019190910190610bb4565b50610c069291505b80821115610ab4578054600160a060020a0319168155600101610be8565b505090505060026000508054806001018281815481835581811511610c3e57818360005260206000209182019101610c3e9190610606565b50505060009283525060208220018054600160a060020a0319168a17905590505b8251811015610ccc5760408051602081810183526000808352600160a060020a038c1681526001909152918220855191926004919091019186908590811015610002576020908102909101810151600160a060020a03168252919091526040902090519055600101610c5f565b600160a060020a0388166000908152600160208181526040805193819020805460029481161561010002600019011693909304601f810183900483028501830190915280845290830182828015610d645780601f10610d3957610100808354040283529160200191610d64565b820191906000526020600020905b815481529060010190602001808311610d4757829003601f168201915b50505050509150509695505050505050565b820191906000526020600020905b815481529060010190602001808311610d8457829003601f168201915b5050604080518854602060026001831615610100026000190190921691909104601f8101829004820283018201909352828252959950948894509092508401905082828015610e315780601f10610e0657610100808354040283529160200191610e31565b820191906000526020600020905b815481529060010190602001808311610e1457829003601f168201915b5050855460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815295985087945092508401905082828015610ebf5780601f10610e9457610100808354040283529160200191610ebf565b820191906000526020600020905b815481529060010190602001808311610ea257829003601f168201915b5050505050915093509350935093509193509193565b5091969095509350505050565b505056",
    unlinked_binary: "606060405260008054600160a060020a03191633179055610ee6806100246000396000f3606060405236156100775760e060020a6000350463200d2ed28114610079578063355e6ce8146100c1578063408bf4c3146100e8578063409ef6391461015857806362bc56e6146102a65780639bafaaa414610350578063f0782640146103e6578063f18d03cc146103f1578063fcc0c90914610441575b005b61061a604080516020818101835260009091528151808301909252600a82527f53414b5552412121212100000000000000000000000000000000000000000000908201525b90565b60016020819052600435600090815260409020600381015461068892820190600283019084565b61081160408051602081810183526000825282516002805480840283018401909552848252929390929183018282801561014c57602002820191906000526020600020905b8154600160a060020a031681526001919091019060200180831161012d575b505050505090506100be565b61085b60043560408051602081810183526000808352835180830185528181528451808401865282815285518085018752838152600160a060020a03881684526001909452855195832060050154949591949390929091819085908059106101bd5750595b90808252806020026020018201604052509350846040518059106101de5750595b90808252806020026020018201604052509250600091505b84821015610ed557600160a060020a03881660009081526001602052604090206005018054839081101561000257906000526020600020900160009054906101000a9004600160a060020a031690508084838151811015610002576020818102909201820192909252600160a060020a038a1660009081526001825260408082208583526004019092522054845190918591811015610002575050602083810285010152600191909101906101f6565b6108e0600435604080516020818101835260008083528351808301855281815284518084018652828152600160a060020a038716835260018085528684206003810154815489516002828616156101000260001901909216829004601f81018a90048a0282018a01909b528a815298999598949792959386019490860193919290918691830182828015610da15780601f10610d7657610100808354040283529160200191610da1565b61007760043560005b600160a060020a038216600090815260016020526040902060050154811015610ee25760406000908120600581018054600a936004939093019291908590811015610002575060408083209183526020808420870154600160a060020a03908116855294815290832080549095019094559185169052600191829052600301805460091901905501610359565b610a136002546100be565b600160a060020a0360048035821660009081526001602090815260408083206024358616845290930190528181208054606435908190039091556044359390931681522080549091019055610077565b60408051602060046024803582810135601f810185900485028601850190965285855261061a9583359593946044949392909201918190840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976084979196506024919091019450909250829150840183828082843750506040805160a435808a013560208181028481018201909552818452989a9935999860c4985092965060249190910194509250829190850190849080828437509496505050505050506020604051908101604052806000815260200150600060a06040519081016040528088815260200187815260200186815260200185815260200184815260200150600160005060008a600160a060020a031681526020019081526020016000206000506000820151816000016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a2557805160ff19168380011785555b50610a559291505b80821115610ab45760008155600101610606565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561067a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6040805160608101839052608080825286546002600182161561010002600019019091160490820181905290918291602083019183019060a0840190899080156107135780601f106106e857610100808354040283529160200191610713565b820191906000526020600020905b8154815290600101906020018083116106f657829003601f168201915b5050848103835287546002600182161561010002600019019091160480825260209190910190889080156107885780601f1061075d57610100808354040283529160200191610788565b820191906000526020600020905b81548152906001019060200180831161076b57829003601f168201915b5050848103825286546002600182161561010002600019019091160480825260209190910190879080156107fd5780601f106107d2576101008083540402835291602001916107fd565b820191906000526020600020905b8154815290600101906020018083116107e057829003601f168201915b505097505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f1509050019250505060405180910390f35b6040518080602001806020018381038352858181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f1509050018381038252848181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f15090500194505050505060405180910390f35b604051808060200180602001806020018581526020018481038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561094e5780820380516001836020036101000a031916815260200191505b508481038352878181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156109a75780820380516001836020036101000a031916815260200191505b508481038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610a005780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b60408051918252519081900360200190f35b828001600101855582156105fe579182015b828111156105fe578251826000505591602001919060010190610a37565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ab857805160ff19168380011785555b50610ae8929150610606565b5090565b82800160010185558215610aa8579182015b82811115610aa8578251826000505591602001919060010190610aca565b50506040820151816002016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4757805160ff19168380011785555b50610b77929150610606565b82800160010185558215610b3b579182015b82811115610b3b578251826000505591602001919060010190610b59565b5050606082015160038201556080820151805160058301805482825560008281526020908190209294918301939291018215610be0579160200282015b82811115610be05782518254600160a060020a0319161782556020929092019160019190910190610bb4565b50610c069291505b80821115610ab4578054600160a060020a0319168155600101610be8565b505090505060026000508054806001018281815481835581811511610c3e57818360005260206000209182019101610c3e9190610606565b50505060009283525060208220018054600160a060020a0319168a17905590505b8251811015610ccc5760408051602081810183526000808352600160a060020a038c1681526001909152918220855191926004919091019186908590811015610002576020908102909101810151600160a060020a03168252919091526040902090519055600101610c5f565b600160a060020a0388166000908152600160208181526040805193819020805460029481161561010002600019011693909304601f810183900483028501830190915280845290830182828015610d645780601f10610d3957610100808354040283529160200191610d64565b820191906000526020600020905b815481529060010190602001808311610d4757829003601f168201915b50505050509150509695505050505050565b820191906000526020600020905b815481529060010190602001808311610d8457829003601f168201915b5050604080518854602060026001831615610100026000190190921691909104601f8101829004820283018201909352828252959950948894509092508401905082828015610e315780601f10610e0657610100808354040283529160200191610e31565b820191906000526020600020905b815481529060010190602001808311610e1457829003601f168201915b5050855460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815295985087945092508401905082828015610ebf5780601f10610e9457610100808354040283529160200191610ebf565b820191906000526020600020905b815481529060010190602001808311610ea257829003601f168201915b5050505050915093509350935093509193509193565b5091969095509350505050565b505056",
    address: "0x4a05a5a3febfd90f8fe5603f6428d045a9cab0d2",
    generated_with: "2.0.6",
    contract_name: "Sakura"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Sakura error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Sakura error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Sakura error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Sakura error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Sakura = Contract;
  }

})();
