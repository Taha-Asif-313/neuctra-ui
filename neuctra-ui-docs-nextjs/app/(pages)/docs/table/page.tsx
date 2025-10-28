"use client";

import React, { useState } from "react";
import { Table } from "@neuctra/ui";
import { ChevronDown, ChevronUp, ChevronsUpDown, Check } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const TableDocs: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);

  const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32, status: "Inactive" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45, status: "Active" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 24, status: "Pending" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", age: 36, status: "Active" },
    { id: 6, name: "Diana Miller", email: "diana@example.com", age: 29, status: "Inactive" },
    { id: 7, name: "Evan Davis", email: "evan@example.com", age: 41, status: "Pending" },
  ];

  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    { prop: "columns", type: "Column[]", default: "—", description: "Array of column definitions" },
    { prop: "data", type: "Record<string, any>[]", default: "—", description: "Array of data objects to display" },
    { prop: "className", type: "string", default: `""`, description: "Additional class name for the table container" },
    { prop: "pagination", type: "boolean", default: "true", description: "Enable/disable pagination" },
    { prop: "rowsPerPage", type: "number", default: "5", description: "Number of rows per page" },
    { prop: "sortable", type: "boolean", default: "true", description: "Enable/disable sorting for all columns" },
    { prop: "defaultSort", type: "{ column: string; direction: 'asc' | 'desc' }", default: "—", description: "Initial sort configuration" },
    { prop: "bodyAlign", type: "'left' | 'center' | 'right'", default: `"left"`, description: "Default alignment for table body cells" },
    { prop: "headerAlign", type: "'left' | 'center' | 'right'", default: `"left"`, description: "Default alignment for header cells" },
    { prop: "rowSelection", type: "{ enabled?: boolean; onSelect?: (selectedRows: any[]) => void; selectionColumnWidth?: string; selectionColumnHeader?: ReactNode }", default: "{ enabled: false }", description: "Row selection configuration" },
    { prop: "emptyState", type: "ReactNode", default: "No data available message", description: "Custom component to display when no data is available" },
    { prop: "onRowClick", type: "(row: any, index: number) => void", default: "—", description: "Callback when a row is clicked" },
    { prop: "rowClassName", type: "(row: any, index: number) => string", default: "—", description: "Function to generate custom class names for rows" },
    { prop: "cellPadding", type: "string", default: `"12px"`, description: "Padding for table body cells" },
    { prop: "headerCellPadding", type: "string", default: `"12px"`, description: "Padding for header cells" },
    { prop: "stickyHeader", type: "boolean", default: "false", description: "Make header sticky" },
    { prop: "maxHeight", type: "string", default: "—", description: "Maximum height of the table" },
    { prop: "scrollShadow", type: "boolean", default: "false", description: "Add shadow when scrolling" },
    
    // Color props
    { prop: "colors.headerBg", type: "string", default: `"#3b82f6"`, description: "Background color for header" },
    { prop: "colors.headerText", type: "string", default: `"#ffffff"`, description: "Text color for header" },
    { prop: "colors.rowBg", type: "string", default: `"#ffffff"`, description: "Background color for rows" },
    { prop: "colors.rowText", type: "string", default: `"#000000"`, description: "Text color for rows" },
    { prop: "colors.borderColor", type: "string", default: `"#d1d5db"`, description: "Border color" },
    { prop: "colors.hoverBg", type: "string", default: `"#e5e7eb"`, description: "Background color on row hover" },
    { prop: "colors.paginationBg", type: "string", default: `"#d1d5db"`, description: "Background color for pagination" },
    { prop: "colors.paginationText", type: "string", default: `"#000000"`, description: "Text color for pagination" },
    { prop: "colors.evenRowBg", type: "string", default: `"#f9fafb"`, description: "Background color for even rows" },
    { prop: "colors.selectedRowBg", type: "string", default: `"#e0f2fe"`, description: "Background color for selected rows" },
    
    // Border radius props
    { prop: "borderRadius.table", type: "string", default: `"8px"`, description: "Border radius for the table" },
    { prop: "borderRadius.header", type: "string", default: `"8px"`, description: "Border radius for header cells" },
    { prop: "borderRadius.pagination", type: "string", default: `"6px"`, description: "Border radius for pagination buttons" },
  ];

  const columnProps = [
    { key: "property", label: "Property", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "required", label: "Required", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const columnData = [
    { property: "key", type: "string", required: "Yes", description: "Unique identifier for the column (matches data property)" },
    { property: "label", type: "string", required: "Yes", description: "Display text for the column header" },
    { property: "sortable", type: "boolean", required: "No", description: "Whether the column is sortable" },
    { property: "icon", type: "ReactNode", required: "No", description: "Icon to display in the header" },
    { property: "width", type: "string | number", required: "No", description: "Custom width for the column" },
    { property: "align", type: "'left' | 'center' | 'right'", required: "No", description: "Column-specific alignment" },
    { property: "headerClassName", type: "string", required: "No", description: "Custom class for header cell" },
    { property: "cellClassName", type: "string", required: "No", description: "Custom class for body cells" },
    { property: "render", type: "(value: any, row: Record<string, any>) => ReactNode", required: "No", description: "Custom cell renderer function" },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Table</span> Component Documentation
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { Table } from "@neuctra/ui";`}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Examples</h2>
        
        <h3 className="text-xl font-semibold mb-3">Simple Table</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "age", label: "Age", sortable: true },
    { key: "status", label: "Status" }
  ]}
  data={sampleData}
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "Email", sortable: true },
                { key: "age", label: "Age", sortable: true },
                { key: "status", label: "Status" }
              ]}
              data={sampleData}
              colors={{
                headerBg: "#3b82f6",
                headerText: "#ffffff",
                rowBg: "#ffffff",
                rowText: "#000000",
                borderColor: "#d1d5db",
                hoverBg: "#e5e7eb",
                paginationBg: "#d1d5db",
                paginationText: "#000000",
                evenRowBg: "#f9fafb",
                selectedRowBg: "#e0f2fe",
              }}
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">With Row Selection</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" }
  ]}
  data={sampleData}
  rowSelection={{
    enabled: true,
    onSelect: setSelectedRows,
    selectionColumnWidth: "60px"
  }}
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "Email" },
                { key: "status", label: "Status" }
              ]}
              data={sampleData}
              rowSelection={{
                enabled: true,
                onSelect: setSelectedRows,
                selectionColumnWidth: "60px"
              }}
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">With Custom Rendering</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name" },
    { 
      key: "status", 
      label: "Status",
      render: (value) => (
        <span style={{ 
          color: value === 'Active' ? 'green' : 
                 value === 'Inactive' ? 'red' : 'orange',
          fontWeight: 'bold'
        }}>
          {value}
        </span>
      )
    },
    {
      key: "age",
      label: "Age Group",
      render: (value) => {
        if (value < 30) return "Young";
        if (value < 40) return "Adult";
        return "Senior";
      }
    }
  ]}
  data={sampleData}
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name" },
                { 
                  key: "status", 
                  label: "Status",
                  render: (value) => (
                    <span style={{ 
                      color: value === 'Active' ? 'green' : 
                             value === 'Inactive' ? 'red' : 'orange',
                      fontWeight: 'bold'
                    }}>
                      {value}
                    </span>
                  )
                },
                {
                  key: "age",
                  label: "Age Group",
                  render: (value) => {
                    if (value < 30) return "Young";
                    if (value < 40) return "Adult";
                    return "Senior";
                  }
                }
              ]}
              data={sampleData}
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Sticky Header with Max Height</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "id", label: "ID", width: "80px" },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "age", label: "Age", sortable: true },
    { key: "status", label: "Status" }
  ]}
  data={sampleData}
  stickyHeader
  maxHeight="300px"
  scrollShadow
/>`}
          previewContent={
            <Table
              columns={[
                { key: "id", label: "ID", width: "80px" },
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "Email", sortable: true },
                { key: "age", label: "Age", sortable: true },
                { key: "status", label: "Status" }
              ]}
              data={sampleData}
              stickyHeader
              maxHeight="300px"
              scrollShadow
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Custom Styling</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" }
  ]}
  data={sampleData}
  colors={{
    headerBg: "#7c3aed",
    headerText: "#ffffff",
    rowBg: "#f5f3ff",
    rowText: "#4c1d95",
    borderColor: "#c4b5fd",
    hoverBg: "#ddd6fe",
    paginationBg: "#8b5cf6",
    paginationText: "#ffffff",
    evenRowBg: "#ede9fe",
    selectedRowBg: "#c4b5fd",
  }}
  borderRadius={{
    table: "12px",
    header: "12px 12px 0 0",
    pagination: "8px",
  }}
  cellPadding="16px"
  headerCellPadding="16px"
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "Email" },
                { key: "status", label: "Status" }
              ]}
              data={sampleData}
              colors={{
                headerBg: "#7c3aed",
                headerText: "#ffffff",
                rowBg: "#f5f3ff",
                rowText: "#4c1d95",
                borderColor: "#c4b5fd",
                hoverBg: "#ddd6fe",
                paginationBg: "#8b5cf6",
                paginationText: "#ffffff",
                evenRowBg: "#ede9fe",
                selectedRowBg: "#c4b5fd",
              }}
              borderRadius={{
                table: "12px",
                header: "12px 12px 0 0",
                pagination: "8px",
              }}
              cellPadding="16px"
              headerCellPadding="16px"
            />
          }
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <Table
          columns={columns}
          data={data}
          pagination={false}
          colors={{
            headerBg: "#3b82f6",
            headerText: "#ffffff",
            rowBg: "#ffffff",
            rowText: "#000000",
            borderColor: "#d1d5db",
            hoverBg: "#e5e7eb",
            evenRowBg: "#f9fafb",
          }}
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Column Interface</h3>
        <Table
          columns={columnProps}
          data={columnData}
          pagination={false}
          colors={{
            headerBg: "#3b82f6",
            headerText: "#ffffff",
            rowBg: "#ffffff",
            rowText: "#000000",
            borderColor: "#d1d5db",
            hoverBg: "#e5e7eb",
            evenRowBg: "#f9fafb",
          }}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Advanced Features</h2>
        
        <h3 className="text-xl font-semibold mb-3">Custom Empty State</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" }
  ]}
  data={[]}
  emptyState={
    <div style={{ 
      padding: "40px",
      textAlign: "center",
      color: "#6b7280"
    }}>
      <div style={{ fontSize: "24px", marginBottom: "16px" }}>
        No data found
      </div>
      <button 
        style={{
          padding: "8px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Refresh Data
      </button>
    </div>
  }
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "status", label: "Status" }
              ]}
              data={[]}
              emptyState={
                <div style={{ 
                  padding: "40px",
                  textAlign: "center",
                  color: "#6b7280"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "16px" }}>
                    No data found
                  </div>
                  <button 
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Refresh Data
                  </button>
                </div>
              }
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Row Click Handler</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" }
  ]}
  data={sampleData}
  onRowClick={(row, index) => {
    alert(\`Clicked row \${index + 1}: \${row.name}\`);
  }}
  rowClassName={(row) => 
    row.status === "Active" ? "active-row" : ""
  }
/>`}
          previewContent={
            <Table
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "status", label: "Status" }
              ]}
              data={sampleData}
              onRowClick={(row, index) => {
                alert(`Clicked row ${index + 1}: ${row.name}`);
              }}
              rowClassName={(row) => 
                row.status === "Active" ? "active-row" : ""
              }
            />
          }
          className="mb-8"
        />

        <h3 className="text-xl font-semibold mb-3">Custom Icons</h3>
        <CodePreviewBlock
          language="tsx"
          code={`<Table
  columns={[
    { 
      key: "name", 
      label: "Name", 
      sortable: true,
      icon: <User size={16} /> 
    },
    { 
      key: "email", 
      label: "Email", 
      sortable: true,
      icon: <Mail size={16} /> 
    },
    { 
      key: "status", 
      label: "Status",
      icon: <Activity size={16} />
    }
  ]}
  data={sampleData}
/>`}
          previewContent={
            <Table
              columns={[
                { 
                  key: "name", 
                  label: "Name", 
                  sortable: true,
                  icon: <Check size={16} /> 
                },
                { 
                  key: "email", 
                  label: "Email", 
                  sortable: true,
                  icon: <Check size={16} /> 
                },
                { 
                  key: "status", 
                  label: "Status",
                  icon: <Check size={16} />
                }
              ]}
              data={sampleData}
            />
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
          <li>Proper ARIA attributes for sortable columns</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader compatibility</li>
          <li>High contrast color options</li>
          <li>Focus management for interactive elements</li>
          <li>Semantic HTML table structure</li>
          <li>Responsive design with horizontal scrolling for small screens</li>
        </ul>
      </section>
    </div>
  );
};

export default TableDocs;