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
        opts['addButtons'] = JSON.stringify(addButton);
        opts['actions'] = JSON.stringify(actionButton);

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

        opts['id']='file-systems';
        opts['gridId']= "fileSystemsGrid";
        opts['data']=JSON.stringify(result);
        gridFields = [
                      {
                          "column-id":'use%',
                          "type": 'string',
                          "width":"10%",
                          "title":"Use %"
                      },
                     {
                          "column-id": 'used',
                          "type": 'string',
                          "width":"10%",
                          "title":"Used"
                      },
                      {
                         "column-id": 'mounted_on',
                         "type": 'string',
                         "identifier":true,
                         "width":"25%",
                         "title":"Mount Point"
                      },
                      {
                        "column-id": 'avail',
                        "type": 'string',
                        "width":"10%",
                        "title":"Available"
                      },
                      {
                        "column-id": 'filesystem',
                          "type": 'string',
                          "width":"20%",
                          "title":"File System"
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

        ginger.createGrid(opts);
    });
    /*$("#addFCP").on("click",function(event){
     wok.window.open("plugins/gingers390x/network.html");
   });*/
};
