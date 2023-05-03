import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Configurations {

  public static serviceTheme = 'dark';
  public static serviceThemeObserver = new Subject<any>();

  public createTranslateLoader: (client: HttpClient) => MultiTranslateHttpLoader;
  public static serviceMeteringEndPoint = 'http://localhost:30044/api.metering/metering/v1/handle';
  public static serviceLoginCoreEndPoint = 'https://serengeti.aifrica.co.kr/api.login/auth/v1/handle';
  public static serviceContent = {
    'provisioningType': 'Approval',
    'disabled_services': [
      'api.marketplace'
    ],
    'resources': ['Image', 'Instance', 'LoadBalancer', 'SecurityGroup', 'Volume'],
    'cloud': {
      'LegacyCloud': {
        'features': {
          'Instance': {
            'authentification': ['Password'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'notWhen': ['terminated']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'unsupported': ['start', 'stop', 'reboot', 'backup']
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'FileManager']
          },
          'unsupported': ['Volume', 'Snapshot', 'SecurityGroups', 'ElasticIp']
        }
      },
      'NaverCloudPlatform': {
        'features': {
          'Instance': {
            'authentification': ['Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'LoadBalancer', 'FileManager']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'when': ['available']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          },
          'Image': {
            'operations': {
              'delete': {
                'when': ['available']
              }
            }
          }
        }
      },
      'Amazon': {
        'features': {
          'Instance': {
            'authentification': ['Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'LoadBalancer', 'FileManager']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'when': ['available']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          },
          'Image': {
            'operations': {
              'delete': {
                'when': ['available']
              }
            }
          }
        }
      },
      'Kubernetes': {
        'features': {
          'Instance': {
            'authentification': ['Password'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'notWhen': ['terminated']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'unsupported': ['start', 'stop', 'reboot', 'backup', 'monitoring']
            },
            'associations': ['Monitoring', 'Volume', 'LoadBalancer', 'FileManager']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'when': ['available']
              },
              'unsupported': ['attach', 'detach']
            },
            'associations': ['Instance']
          },
          'Image': {
            'operations': {
              'create': {},
              'delete': {
                'when': ['available']
              }
            }
          },
          'unsupported': ['SecurityGroups', 'Snapshot', 'ElasticIp']
        }
      },
      'VMWareVCenter': {
        'features': {
          'Instance': {
            'authentification': ['Password'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'notWhen': ['terminated']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'unsupported': ['start', 'stop', 'reboot', 'backup']
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'FileManager']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'unsupported': ['attach', 'detach']
            },
            'associations': ['Instance']
          },
          'unsupported': ['SecurityGroups', 'ElasticIp']
        }
      },
      'OpenstackV2': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      },
      'OpenstackV3': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'create-image': {
                'when': ['stopped', 'running']
              },
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped', 'running']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup', 'NetworkInterface']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      },
      'Google': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      },
      'MSAzure': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      },
      'Nutanix': {
        'features': {
          'Instance': {
            'authentification': ['Password']
          }
        }
      },
      'Openstack': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      },
      'TencentCloud': {
        'features': {
          'Instance': {
            'authentification': ['Password', 'Identity'],
            'operations': {
              'connect': {
                'when': ['running']
              },
              'update': {
                'when': ['stopped']
              },
              'terminate': {
                'notWhen': ['terminated']
              },
              'delete': {
                'when': ['terminated']
              },
              'start': {
                'when': ['stopped']
              },
              'stop': {
                'when': ['running']
              },
              'reboot': {
                'when': ['running']
              },
              'backup': {
                'when': ['stopped']
              },
              'monitoring': {
                'when': ['running']
              }
            },
            'associations': ['Monitoring', 'Volume', 'Snapshot', 'LoadBalancer', 'SecurityGroup']
          },
          'Volume': {
            'operations': {
              'update': {
                'when': ['available']
              },
              'delete': {
                'notWhen': ['inuse', 'undetachable']
              },
              'attach': {
                'when': ['available']
              },
              'detach': {
                'when': ['inuse']
              },
              'unsupported': ['backup']
            },
            'associations': ['Instance', 'Snapshot']
          }
        }
      }
    },
    'apiNames': [
      {'id': 'apiApplication', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiApplicationExecution', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiBilling', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiLogin', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiMail', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiMonitoring', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiNotification', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiResource', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiResourceTask', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiResourceTemplate', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiResourceManager', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiScheduler', 'host': 'https://110.45.179.38:30080'},
      {'id': 'apiUser', 'host': 'https://110.45.179.38:30080'}
    ],
    'apiMethods': ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'PAGE'],
    'accessRoles': ['Root', 'UserAdmin', 'UserGeneral', 'Developer'],
    'activeStates': ['Active', 'Inactive'],
    'variableTypes': [
      'String',
      'Integer',
      'Double',
      'Boolean',
      'Custom'
    ],
    'displayQuotas': [{
      'type': 'QuotaCpu'
    }, {
      'type': 'QuotaMemory'
    }, {
      'type': 'QuotaDisk'
    }, {
      'type': 'QuotaGpu'
    }],
    'themeConfig': {
      'dark': {
        'mainColor': '#303030',
        'contentColor': '#262525',
        'fontColor': '#D4D4D4',
        'underlineColor': 'rgba(212, 212, 212, 0.6)',
        'pointColor': '#E05749',
        'borderColor': '#3C3C3C',
        'gridColor': 'rgba(128, 128, 128, 0.5)',
        'hoverColor': '#E05749',
        'hoverFontColor': '#D4D4D4',
        'buttonColor': '#EFEFEF',
        'impactColor': 'green',

        'toolbarBackgroundColor': 'black',
        'toolbarColor': 'white',
        'toolbarSelectionColor': 'white',
        'toolbarSelectionBackgroundColor': 'red',

        'selectedStateColor': '#374452',
        'abnormalStateColor': 'brown',
        'incompleteStateColor': 'steelblue',
        'progressStateColor': 'lightcoral',
        'completedStateColor': 'green',

        'workflowBackground': 'white',
        'workflowGrid': 'darkgray',

        'normalBorder': 'black',
        'startBorder': 'green',
        'normalSelect': 'darkgray',
        'startSelect': 'green',
        'normalText': '#000000',
        'startSelectText': '#ffffff',
        'normalSelectText': 'black',
        'normalBackground': '#ffffff',
        'chainSelect': '#acac05',
        'chainBackground': '#ffffff'
      },
      'light': {
        'mainColor': '#FFFFFF',
        'contentColor': '#F6F6F6',
        'fontColor': '#000000',
        'underlineColor': 'rgba(0, 0, 0, 0.6)',
        'pointColor': '#007AAE',
        'borderColor': '#5C5C5C',
        'gridColor': 'rgba(0, 0, 0, 0.5)',
        'hoverColor': '#007AAE',
        'hoverFontColor': '#F6F6F6',
        'buttonColor': '#D7D7D7',
        'impactColor': 'rgba(128, 128, 128, 0.5)',

        'toolbarBackgroundColor': '#6C00FF',
        'toolbarColor': 'white',
        'toolbarSelectionColor': 'black',
        'toolbarSelectionBackgroundColor': '#F2DEBA',

        'selectedStateColor': '#374452',
        'abnormalStateColor': 'brown',
        'incompleteStateColor': 'steelblue',
        'progressStateColor': 'lightcoral',
        'completedStateColor': 'green',

        'workflowBackground': 'white',
        'workflowGrid': 'darkgray',

        'normalBorder': 'black',
        'startBorder': 'green',
        'normalSelect': 'darkgray',
        'startSelect': 'green',
        'normalText': '#000000',
        'startSelectText': '#ffffff',
        'normalSelectText': 'black',
        'normalBackground': '#ffffff',
        'chainSelect': '#acac05',
        'chainBackground': '#ffff00'
      }
    }
  };

  getTheme: () => string;
  getThemeObserver: () => Observable<any>;
  getMeteringEndPoint: () => string;
  getLoginEndPoint: () => string;
  getContent: () => any;

  constructor() {
    this.createTranslateLoader = null;
  }

  public static getServiceThemeObserver(config: Configurations): Observable<any> {
    if (config.getThemeObserver) {
      return config.getThemeObserver();
    } else {
      return Configurations.serviceThemeObserver;
    }
  }

  static getServiceMeteringEndPoint(config: Configurations) {
    if (config.getMeteringEndPoint) {
      return config.getMeteringEndPoint();
    } else {
      return Configurations.serviceMeteringEndPoint;
    }
  }

  static getServiceLoginEndPoint(config: Configurations) {
    if (config.getLoginEndPoint) {
      return config.getLoginEndPoint();
    } else {
      return Configurations.serviceLoginCoreEndPoint;
    }
  }

  public static getServiceContent(config: Configurations) {
    if (config.getContent) {
      return config.getContent();
    } else {
      return Configurations.serviceContent;
    }
  }
}
