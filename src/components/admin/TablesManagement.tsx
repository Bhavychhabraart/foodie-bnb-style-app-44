
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, Plus, Save, Trash2 } from 'lucide-react';

interface RestaurantTable {
  id: string;
  table_number: number;
  capacity: number;
  location: string;
  is_available: boolean;
}

const TablesManagement = () => {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTable, setCurrentTable] = useState<Partial<RestaurantTable>>({
    table_number: 0,
    capacity: 2,
    location: '',
    is_available: true
  });
  const { toast } = useToast();

  const fetchTables = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('restaurant_tables')
        .select('*')
        .order('table_number', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setTables(data || []);
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast({
        title: "Error",
        description: "Failed to load tables. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentTable(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleAddEditTable = async () => {
    try {
      // Validate form
      if (!currentTable.table_number || !currentTable.capacity || !currentTable.location) {
        toast({
          title: "Validation Error",
          description: "Please fill out all fields.",
          variant: "destructive"
        });
        return;
      }
      
      if (isEditMode && currentTable.id) {
        // Update existing table
        const { error } = await supabase
          .from('restaurant_tables')
          .update({
            table_number: currentTable.table_number,
            capacity: currentTable.capacity,
            location: currentTable.location,
            is_available: currentTable.is_available
          })
          .eq('id', currentTable.id);
        
        if (error) throw error;
        
        toast({
          title: "Table Updated",
          description: `Table ${currentTable.table_number} has been updated successfully.`
        });
      } else {
        // Create new table
        const { error } = await supabase
          .from('restaurant_tables')
          .insert({
            table_number: currentTable.table_number,
            capacity: currentTable.capacity,
            location: currentTable.location,
            is_available: currentTable.is_available || true
          });
        
        if (error) throw error;
        
        toast({
          title: "Table Created",
          description: `Table ${currentTable.table_number} has been added successfully.`
        });
      }
      
      // Reset form and refresh tables
      handleCloseDialog();
      fetchTables();
    } catch (error) {
      console.error('Error saving table:', error);
      toast({
        title: "Error",
        description: "Failed to save table. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTable = async (id: string, tableNumber: number) => {
    if (window.confirm(`Are you sure you want to delete Table ${tableNumber}?`)) {
      try {
        const { error } = await supabase
          .from('restaurant_tables')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Table Deleted",
          description: `Table ${tableNumber} has been deleted.`
        });
        
        fetchTables();
      } catch (error) {
        console.error('Error deleting table:', error);
        toast({
          title: "Error",
          description: "Failed to delete table. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleEditTable = (table: RestaurantTable) => {
    setCurrentTable(table);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleAddNewTable = () => {
    setCurrentTable({
      table_number: Math.max(0, ...tables.map(t => t.table_number)) + 1,
      capacity: 2,
      location: '',
      is_available: true
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
  };

  const handleToggleAvailability = async (id: string, isCurrentlyAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('restaurant_tables')
        .update({ is_available: !isCurrentlyAvailable })
        .eq('id', id);
      
      if (error) throw error;
      
      fetchTables();
    } catch (error) {
      console.error('Error updating table availability:', error);
      toast({
        title: "Error",
        description: "Failed to update table availability. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-airbnb-light">Tables Management</h2>
        <Button 
          onClick={handleAddNewTable}
          className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Table
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-airbnb-light/70">Loading tables...</p>
        </div>
      ) : (
        <div className="rounded-md border border-airbnb-gold/20 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Restaurant tables configuration</TableCaption>
              <TableHeader className="bg-[#1A1A1A]">
                <TableRow className="hover:bg-[#1E1E1E] border-airbnb-gold/10">
                  <TableHead className="text-airbnb-light/70 w-[100px]">Table #</TableHead>
                  <TableHead className="text-airbnb-light/70">Capacity</TableHead>
                  <TableHead className="text-airbnb-light/70">Location</TableHead>
                  <TableHead className="text-airbnb-light/70">Status</TableHead>
                  <TableHead className="text-airbnb-light/70 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.length > 0 ? (
                  tables.map((table) => (
                    <TableRow key={table.id} className="hover:bg-[#1A1A1A] border-airbnb-gold/10">
                      <TableCell className="font-medium text-airbnb-light">
                        Table {table.table_number}
                      </TableCell>
                      <TableCell className="text-airbnb-light">
                        {table.capacity} {table.capacity === 1 ? 'person' : 'people'}
                      </TableCell>
                      <TableCell className="text-airbnb-light">{table.location}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            table.is_available
                              ? "bg-green-500/20 text-green-500 border border-green-500/20 cursor-pointer hover:bg-green-500/30"
                              : "bg-red-500/20 text-red-500 border border-red-500/20 cursor-pointer hover:bg-red-500/30"
                          }
                          onClick={() => handleToggleAvailability(table.id, table.is_available)}
                        >
                          {table.is_available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTable(table)}
                            className="text-airbnb-light hover:bg-airbnb-gold/10"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTable(table.id, table.table_number)}
                            className="text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <p className="text-airbnb-light/70">No tables configured</p>
                      <p className="text-sm text-airbnb-light/50">Add tables to start managing seating</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#1E1E1E] border border-airbnb-gold/20 text-airbnb-light sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Table' : 'Add New Table'}</DialogTitle>
            <DialogDescription className="text-airbnb-light/70">
              {isEditMode 
                ? 'Update the details for this table.'
                : 'Add a new table to the restaurant configuration.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="table_number" className="text-right">
                Table #
              </Label>
              <Input
                id="table_number"
                name="table_number"
                type="number"
                value={currentTable.table_number}
                onChange={handleInputChange}
                className="col-span-3 bg-[#121212] border-airbnb-gold/20 text-airbnb-light"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                value={currentTable.capacity}
                onChange={handleInputChange}
                className="col-span-3 bg-[#121212] border-airbnb-gold/20 text-airbnb-light"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={currentTable.location}
                onChange={handleInputChange}
                className="col-span-3 bg-[#121212] border-airbnb-gold/20 text-airbnb-light"
                placeholder="e.g. Window, Patio, Main area"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_available" className="text-right">
                Available
              </Label>
              <div className="col-span-3 flex items-center">
                <input
                  type="checkbox"
                  id="is_available"
                  name="is_available"
                  checked={currentTable.is_available}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-airbnb-gold/20 text-airbnb-gold focus:ring-airbnb-gold"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} className="border-airbnb-gold/20 text-airbnb-light">
              Cancel
            </Button>
            <Button onClick={handleAddEditTable} className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90">
              <Save className="h-4 w-4 mr-2" /> {isEditMode ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TablesManagement;
