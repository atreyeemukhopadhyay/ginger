/**
 *
 */
ginger.initStorage = function(){
 $(".content-area", "#storage-section").css("height", "100%");

   ginger.loadFileSystemDetails();
   ginger.loadSwapDeviceDetails();
   ginger.loadVolumeGroupDetails();
   ginger.loadStorageDeviceDetails();
   /*ginger.getSwapdevices(function(result){
     var gridFields = [];
     var opts =[];
     opts['id']='swap-devices';
     opts['url'] = 'plugins/ginger/swaps';
     opts['gridId']= "swapDevicesGrid";
     for (i=0; i < result.length; i++){
       //calculate usage % from size and used (both are in bytes)
       result[i]['use_percent']= (parseInt(result[i]['used'])/parseInt(result[i]['size'])) * 100;
       result[i]['use_percent'] = result[i]['use_percent'].toFixed(2) + "%";
       // convert size in bytes to readable format
       result[i]['size'] = wok.formatMeasurement(parseInt(result[i]['size']), {
                     fixed: 2});
       result[i]['size'] = result[i]['size'].toString();
     }
     opts['data']=JSON.stringify(result);
     gridFields = [
                   {
                       "column-id":'filename',
                       "type": 'string',
                       "width":"20%",
                       "title":'Name',
                       "identifier":true
                   },
                  {
                       "title": "Type",
                       "column-id": 'type',
                       "width":"15%",
                       "type": 'string'
                   },
                   {
                     "title": "Capacity",
                     "column-id": "size",
                     "width":"10%",
                     "type": 'string'
                   },
                   {
                     "title": "Usage",
                     "column-id": "use_percent",
                     "type": 'string',
                     "width":"50%",
                     "formatter": "percentage-used"
                   }
               ];
     opts['gridFields']=JSON.stringify(gridFields);

   ginger.createGrid(opts);
 });

 ginger.getVolumegroups(function(result){
     var gridFields = [];
     var opts =[];
     opts['id']='volume-groups';
     opts['url'] = 'plugins/ginger/vgs';
     opts['gridId']= "volumeGroupsGrid";
     opts['data']=JSON.stringify(result);
     gridFields = [
                     {
                         "column-id": 'vgName',
                         "type": 'string',
                         "identifier":true,
                         "width":"25%",
                         "title": "Name"
                     },
                    {
                      "column-id": 'vgSize',
                      "type": 'string',
                      "width":"70%",
                      "title": "Capacity"
                     }
                 ];
       opts['gridFields']=JSON.stringify(gridFields);

     ginger.createGrid(opts);
   });*/

};
ginger.loadStorageActionButtons = function(){
var addButton =[
            {
                id:'sd-add-FCP-button',
                class: 'fa fa-plus-circle',
                label: 'Add FCP Device',
                onClick: function(event) {
                    wok.window.open('plugins/gingers390x/addFCPLuns.html');
                }
            },
            {
                id:'sd-add-ECKD-button',
                class: 'fa fa-plus-circle',
                label: 'Add ECKD Device',
                onClick: function(event) {
                  // wok.window.open('plugins/gingerbase/report-add.html');
                }
            },
            {
                id:'sd-add-iSCSI-button',
                class: 'fa fa-plus-circle',
                label: 'Add iSCSI',
                onClick: function(event) {
                    //wok.window.open('plugins/gingerbase/report-add.html');
                }
            }];

var actionButton = [{
      id:'sd-add-VG-button',
      class: 'fa fa-plus-circle',
      label: 'Add to VG',
      onClick: function(event) {
          //wok.window.open('plugins/gingers390x/addFCPLuns.html');
      }
  },
  {
      id:'sd-format-button',
      class: 'fa fa-pencil-square-o',
      label: 'Format',
      onClick: function(event) {
         var opts = [];
         opts['gridId'] = "stgDevGrid";
         opts['identifier'] = "id";
      }
  },
  {
      id:'sd-partition-button',
      class: 'fa fa-pie-chart',
      label: 'Partition',
      onClick: function(event) {
          //wok.window.open('plugins/gingerbase/report-add.html');
      }
  },
  {
      id:'sd-remove-button',
      class: 'fa fa-minus-circle',
      label: 'Remove',
      critical: true,
      onClick: function(event) {
          //wok.window.open('plugins/gingerbase/report-add.html');
      }
  }];

  var addListSettings = {
       panelID : 'file-systems-add',
       buttons : addButton,
       type :'add'
  };
  var actionListSettings = {
    panelID:'file-systems-actions',
    buttons : actionButton,
    type :'action'
  };

  ginger.createActionList(addListSettings);
  ginger.createActionList(actionListSettings);
};
ginger.loadFileSystemDetails =  function(){
  //ginger.loadStorageActionButtons();
  var gridFields = [];
  var opts =[];

    opts['id']='file-systems';
    opts['gridId']= "fileSystemsGrid";

    gridFields = [
                  {
                    "column-id": 'filesystem',
                    "type": 'string',
                    "width":"20%",
                    "title": "Name"
                  },
                 {
                   "column-id": 'mounted_on',
                   "type": 'string',
                   "identifier":true,
                   "width":"20%",
                   "title": "Mount Point"
                  },
                  {
                    "column-id": 'type',
                    "type": 'string',
                    "width":"10%",
                    "title": "Type"
                  },
                  {
                    "column-id": 'size',
                    "type": 'string',
                    "width":"10%",
                    "title": "Size"
                  },
                  {
                    "column-id": "use%",
                    "type": 'string',
                    "title": "Usage",
                    "width":"35%",
                    "formatter": "percentage-used"
                  }
              ];
    opts['gridFields']=JSON.stringify(gridFields);

    ginger.createBootgrid(opts);

    ginger.getFilesystems(function(result){
        ginger.loadBootgridData("fileSystemsGrid",result);
    });
};
ginger.loadSwapDeviceDetails =  function(){
  var gridFields = [];
  var opts =[];
  opts['id']='swap-devices';
  opts['gridId']= "swapDevicesGrid";

  gridFields = [
                {
                    "column-id":'filename',
                    "type": 'string',
                    "width":"20%",
                    "title":'Name',
                    "identifier":true
                },
               {
                    "title": "Type",
                    "column-id": 'type',
                    "width":"15%",
                    "type": 'string'
                },
                {
                  "title": "Capacity",
                  "column-id": "size",
                  "width":"10%",
                  "type": 'string'
                },
                {
                  "title": "Usage",
                  "column-id": "use_percent",
                  "type": 'string',
                  "width":"50%",
                  "formatter": "percentage-used"
                }
            ];
      opts['gridFields']=JSON.stringify(gridFields);
      ginger.createBootgrid(opts);

    ginger.getSwapdevices(function(result){
        for (i=0; i < result.length; i++){
          //calculate usage % from size and used (both are in bytes)
          result[i]['use_percent']= (parseInt(result[i]['used'])/parseInt(result[i]['size'])) * 100;
          result[i]['use_percent'] = result[i]['use_percent'].toFixed(2) + "%";
          // convert size in bytes to readable format
          result[i]['size'] = wok.formatMeasurement(parseInt(result[i]['size']), {
                        fixed: 2});
          result[i]['size'] = result[i]['size'].toString();
         }
          ginger.loadBootgridData("swapDevicesGrid",result);
      });
};
ginger.loadVolumeGroupDetails= function(){
   var gridFields = [];
    var opts =[];
    opts['id']='volume-groups';
    opts['gridId']= "volumeGroupsGrid";

    gridFields = [
                    {
                        "column-id": 'vgName',
                        "type": 'string',
                        "identifier":true,
                        "width":"25%",
                        "title": "Name"
                    },
                   {
                     "column-id": 'vgSize',
                     "type": 'string',
                     "width":"70%",
                     "title": "Capacity"
                    }
                ];
      opts['gridFields']=JSON.stringify(gridFields);

      ginger.createBootgrid(opts);

      ginger.getVolumegroups(function(result){
        ginger.loadBootgridData("volumeGroupsGrid",result);
      });
};
ginger.loadStorageDeviceDetails = function(){
     var gridFields = [];
     var opts =[];
     opts['id']='stg-devs';
     opts['gridId']= "stgDevGrid";

     ginger.loadStorageActionButtons();
     gridFields = [
                   {
                       "column-id":'id',
                       "type": 'string',
                       "identifier":true,
                       "width":"10%",
                       "title":"ID"
                   },
                  {
                       "column-id": 'mpath_count',
                       "type": 'number',
                       "width":"10%",
                       "title":"Multipath Count"
                   },
                   {
                     "column-id": 'type',
                       "type": 'string',
                       "width":"10%",
                       "title":"Type"
                   },
                   {
                     "column-id": 'size',
                       "type": 'string',
                       "width":"10%",
                       "title":"Size"
                   }
               ];
         opts['gridFields']=JSON.stringify(gridFields);

         ginger.createBootgrid(opts);

         ginger.getStgdevs(function(result){
           ginger.loadBootgridData("stgDevGrid",result);
         });
}
