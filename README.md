# Port Operations Automation System (POAS) - Manual Audit Logging

## Overview
The POAS system includes comprehensive manual audit logging capabilities across all operational modules. This feature allows authorized operators to create manual audit log entries when automated systems fail or require manual intervention.

## Manual Audit Logging Features

### 🔧 **System-Wide Implementation**
Manual audit logging has been implemented across all operational modules:
- **Gate Operations** - Vehicle entry/exit logging
- **Weighment Operations** - Weight measurement records
- **Berth Operations** - Vessel operation logging
- **Rake Operations** - Railway cargo operation records
- **Yard Operations** - Cargo allocation and storage logging
- **Resource Management** - Equipment status and maintenance records
- **Geofencing Operations** - Route compliance and tracking records

### 🎯 **Key Features**

#### **Consistent UI/UX**
- **Orange "Add Manual Entry" button** in each module's audit log section
- **Standardized modal interface** with professional styling
- **Form validation** with real-time error feedback
- **Responsive design** that works on all device sizes

#### **Comprehensive Data Capture**
- **Module-specific fields** tailored to each operational area
- **Required field validation** ensures data completeness
- **Custom validation rules** for specific data types
- **Dropdown selections** for standardized data entry

#### **Audit Trail Integrity**
- **Automatic metadata addition**:
  - Entry type: "manual"
  - Operator ID and name
  - Timestamp (ISO format)
  - Module type identification
- **Manual entry reason** field for documentation
- **Visual differentiation** from automated entries

#### **Access Control & Security**
- **Operator identification** embedded in each entry
- **Reason for manual entry** required field
- **Confirmation messages** for successful submissions
- **Error handling** for failed submissions

### 📋 **Module-Specific Fields**

#### **Gate Operations**
**Cargo Vehicles:**
- Vehicle Number, Cargo Type, Driver Details
- Entry/Exit Times, Weight, Destination
- Gate Number, Verification Type, Security Clearance

**Non-Cargo Vehicles:**
- Vehicle Number, Type, Person Details
- Department, Purpose, Entry/Exit Times
- Gate Number, Security Clearance

#### **Weighment Operations**
- Vehicle & Driver Information
- Weighbridge Details (WB-1 to WB-4)
- Tare/Gross/Net Weight Measurements
- Deviation Alerts, Threshold Violations
- Challan Generation Status

#### **Berth Operations**
- Vessel Information (Name, IMO, Flag)
- Captain & Crew Details
- Cargo Type & Quantity
- Berth Assignment & Timeline
- Arrival/Departure Times

#### **Rake Operations**
**Regular & BOBRN Rakes:**
- Rake Reference Number
- Wagon Count & Configuration
- Source Terminal & Destination
- Operator Details & Timeline
- Weight & Alert Information

#### **Yard Operations**
- Allocation ID & Yard Number
- Cargo Type & Space Allocation
- Environmental Conditions
- Stack Height & Moisture Levels
- Operator & Timeline Information

#### **Resource Management**
- Equipment ID & Type
- Operator & Location Details
- Operational Hours & Load Capacity
- Maintenance History & Health Score
- Warranty Status & Issues

#### **Geofencing Operations**
- Vehicle & Driver Information
- Route Assignment & Compliance
- Location Tracking & Speed
- Deviation Flags & Violations
- Distance & Fuel Consumption

### 🚀 **Usage Instructions**

#### **For Operators:**

1. **Navigate to any operational module**
2. **Locate the audit log section** (bottom of each module)
3. **Click "Add Manual Entry"** (orange button in top-right of audit table)
4. **Fill out the required fields** (marked with red asterisk *)
5. **Provide reason for manual entry** in the dedicated field
6. **Review operator metadata** (automatically populated)
7. **Click "Create Entry"** to submit

#### **Field Validation:**
- **Required fields** must be completed
- **Real-time validation** shows errors immediately
- **Custom validation** for specific field types
- **Form submission blocked** until all errors resolved

#### **Confirmation:**
- **Success toast notification** confirms entry creation
- **Error handling** for failed submissions
- **Modal closes automatically** on successful submission

### 🔍 **Technical Implementation**

#### **Components:**
- **ManualEntryModal.tsx** - Reusable modal component
- **Module-specific integration** in each operational component
- **Consistent styling** using Tailwind CSS
- **Toast notifications** for user feedback

#### **Data Structure:**
```typescript
interface ManualEntry {
  // User-provided data
  ...moduleSpecificFields,
  
  // Automatic metadata
  entryType: 'manual',
  operatorId: string,
  operatorName: string,
  timestamp: string (ISO),
  moduleType: string,
  manualEntryReason: string
}
```

#### **Validation System:**
- **Required field checking**
- **Custom validation functions**
- **Real-time error display**
- **Form submission prevention** until valid

### 🛡️ **Security & Compliance**

#### **Access Control:**
- **Operator identification** required for all entries
- **Reason documentation** mandatory
- **Audit trail preservation** with full metadata

#### **Data Integrity:**
- **Validation at multiple levels**
- **Consistent data structure** across modules
- **Error handling** prevents incomplete entries
- **Confirmation system** ensures successful submission

#### **Differentiation:**
- **Manual entries clearly marked** with "Manual Entry" status
- **Visual indicators** in data tables
- **Metadata tracking** for audit purposes
- **Separate handling** from automated entries

### 📊 **Benefits**

1. **Operational Continuity** - System remains functional during automation failures
2. **Data Completeness** - No gaps in audit trails due to system issues
3. **Regulatory Compliance** - Complete documentation for all operations
4. **User-Friendly** - Intuitive interface reduces training requirements
5. **Consistent Experience** - Same interaction pattern across all modules
6. **Audit Trail Integrity** - Full traceability of all manual interventions

### 🔧 **Future Enhancements**

- **Role-based access control** for different operator levels
- **Bulk entry capabilities** for multiple records
- **Integration with external audit systems**
- **Advanced validation rules** based on business logic
- **Automated approval workflows** for sensitive entries

---

## Development Notes

The manual audit logging system is built with:
- **React TypeScript** for type safety
- **Tailwind CSS** for consistent styling
- **Custom validation system** for data integrity
- **Toast notification system** for user feedback
- **Modular architecture** for easy maintenance

Each module maintains its own field definitions while using the shared ManualEntryModal component, ensuring consistency while allowing for module-specific requirements.