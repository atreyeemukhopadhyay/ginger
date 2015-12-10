/**
 *
 */
ginger.initStorage = function(){
    /*$("#storage-section").accordion({
       event:"click",
       collapsible:true,
       active:0
    });*/
 $(".content-area", "#storage-section").css("height", "100%");

    ginger.getFilesystems(function(result){
      var gridFields = [];
      var opts =[];

        opts['id']='file-systems';
        opts['gridId']= "fileSystemsGrid";
        opts['data']=JSON.stringify(result);
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

        ginger.createGrid(opts);
        ginger.loadActionButtons();
    });
    /*$("#addFCP").on("click",function(event){
     wok.window.open("plugins/gingers390x/network.html");
   });*/

   ginger.getSwapdevices(function(result){
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
   });
   ginger.loadActionButtons = function(){
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
           // wok.window.open('plugins/gingerbase/report-add.html');
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
 }
};
