interface customAlertModel{
    icon : string;
    category: string;
    message: string;
  }

export class AlertModels{
    Alerts = [
        {   icon: 'bi-heart-pulse-fill',
            category: 'Raise Medical Emergency',
            message: 'Get Ambulance at Your Live Location'
        },
        {   icon: 'bi-fire',
            category: 'Raise Fire Emergency',
            message: 'Get Fire Brigade Team at Your Live Location'
        },
        
        {   icon: 'bi-car-front-fill',
            category: 'Raise Road Accident Alert',
            message: 'Get Help at any Place'
        },
        {   icon: 'bi-shield-check',
            category: 'Report Criminal Activity',
            message: 'Report Crime and Get help from nearest Police Station'
        }
    ];

    Members = [
        {
            name : 'member1',
            mobile : 'mobile1'
        },
        {
            name : 'member2',
            mobile : 'mobile2'
        }
    ]

    CustomAlerts: customAlertModel[] = [
        {
           icon: 'bi-shield-check',
            category: 'Report Criminal Activity',
            message: 'Report Crime and Get help from nearest Police Station'
        }
    ];

    getAllAlerts(): any{
        const AllAlerts = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.Alerts)
            }, 100)
        });
        return AllAlerts;
    }
}