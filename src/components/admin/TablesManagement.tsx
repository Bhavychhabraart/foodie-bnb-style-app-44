
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, PlusCircle, Search } from 'lucide-react';

// Define table type
type RestaurantTable = {
  id: string;
  table_number: number;
  capacity: number;
  location: string;
  is_available: boolean;
};

const TablesManagement = () => {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTable, setNewTable] = useState<Partial<RestaurantTable>>({
    table_number: 0,
    capacity: 2,
    location: 'Main',
    is_available: true
  });

  // Mock data for tables since we're not connecting to database yet
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const mockTables: RestaurantTable[] = [
        {
          id: '1',
          table_number: 1,
          capacity: 2,
          location: 'Window',
          is_available: true
        },
        {
          id: '2',
          table_number: 2,
          capacity: 4,
          location: 'Main',
          is_available: false
        },
        {
          id: '3',
          table_number: 3,
          capacity: 6,
          location: 'Patio',
          is_available: true
        },
        {
          id: '4',
          table_number: 4,
          capacity: 8,
          location: 'Private Room',
          is_available: true
        },
        {
          id: '5',
          table_number: 5,
          capacity: 2,
          location: 'Bar',
          is_available: false
        },
      ];
      
      setTables(mockTables);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter tables based on search query
  const filteredTables = tables.filter(table => {
    return (
      table.table_number.toString().includes(searchQuery) ||
      table.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort tables by table number
  filteredTables.sort((a, b) => a.table_number - b.table_number);

  // Add new table
  const handleAddTable = () => {
    if (newTable.table_number && newTable.capacity && newTable.location) {
      const newTableObj: RestaurantTable = {
        id: `table-${Date.now()}`, // Generate a temporary ID
        table_number: Number(newTable.table_number),
        capacity: Number(newTable.capacity),
        location: newTable.location,
        is_available: Boolean(newTable.is_available)
      };
      
      setTables([...tables, newTableObj]);
      
      // Reset form
      setNewTable({
        table_number: 0,
        capacity: 2,
        location: 'Main',
        is_available: true
      });
    }
  };

  // Toggle table availability
  const toggleAvailability = (id: string) => {
    setTables(
      tables.map(table => 
        table.id === id 
          ? { ...table, is_available: !table.is_available } 
          : table
      )
    );
  };

  return (
    <div className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle className="text-xl font-semibold text-airbnb-light">Tables Management</CardTitle>
      </CardHeader>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tables by number or location..."
            className="pl-8 bg-[#1E1E1E] border-airbnb-gold/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Table
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E1E1E] border border-airbnb-gold/20">
            <DialogHeader>
              <DialogTitle className="text-airbnb-light">Add New Table</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="table_number" className="text-right text-airbnb-light/70">Table #</label>
                <Input
                  id="table_number"
                  type="number"
                  className="col-span-3 bg-[#2D2D2D] border-airbnb-gold/20"
                  value={newTable.table_number || ''}
                  onChange={(e) => setNewTable({...newTable, table_number: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="capacity" className="text-right text-airbnb-light/70">Capacity</label>
                <Input
                  id="capacity"
                  type="number"
                  className="col-span-3 bg-[#2D2D2D] border-airbnb-gold/20"
                  value={newTable.capacity || 2}
                  onChange={(e) => setNewTable({...newTable, capacity: parseInt(e.target.value) || 2})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right text-airbnb-light/70">Location</label>
                <Input
                  id="location"
                  className="col-span-3 bg-[#2D2D2D] border-airbnb-gold/20"
                  value={newTable.location || ''}
                  onChange={(e) => setNewTable({...newTable, location: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90" onClick={handleAddTable}>
                Add Table
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-airbnb-gold" />
            </div>
          ) : filteredTables.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tables found matching your search
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-airbnb-gold/5 border-b border-airbnb-gold/20">
                    <TableHead className="text-airbnb-light/70">Table #</TableHead>
                    <TableHead className="text-airbnb-light/70">Capacity</TableHead>
                    <TableHead className="text-airbnb-light/70">Location</TableHead>
                    <TableHead className="text-airbnb-light/70">Status</TableHead>
                    <TableHead className="text-right text-airbnb-light/70">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTables.map((table) => (
                    <TableRow key={table.id} className="hover:bg-airbnb-gold/5 border-b border-airbnb-gold/20">
                      <TableCell className="font-medium text-airbnb-light">{table.table_number}</TableCell>
                      <TableCell className="text-airbnb-light">{table.capacity} people</TableCell>
                      <TableCell className="text-airbnb-light">{table.location}</TableCell>
                      <TableCell>
                        {table.is_available ? (
                          <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/20">
                            Reserved
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10 mr-2"
                          onClick={() => toggleAvailability(table.id)}
                        >
                          {table.is_available ? 'Set Reserved' : 'Set Available'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TablesManagement;
