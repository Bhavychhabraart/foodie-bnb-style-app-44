
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Save, Edit, Plus } from "lucide-react";

type Highlight = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
};

const iconList = [
  "award",
  "utensils",
  "clock",
  "pencil",
  "image",
  "text",
  "edit"
];

const EditHighlights: React.FC = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [editing, setEditing] = useState<Highlight | null>(null);
  const [form, setForm] = useState<Omit<Highlight, "id">>({
    title: "",
    description: "",
    icon_name: iconList[0]
  });
  const [loading, setLoading] = useState(false);

  // Fetch highlights
  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    supabase.from("highlights").select("*").order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: "Error", description: "Failed to fetch highlights", variant: "destructive" });
        } else if (data) {
          setHighlights(data);
        }
      });
  };

  const handleEdit = (h: Highlight) => {
    setEditing(h);
    setForm({
      title: h.title,
      description: h.description,
      icon_name: h.icon_name
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this highlight?")) return;
    setLoading(true);
    const { error } = await supabase.from("highlights").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Could not delete", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Highlight removed" });
      refresh();
      if (editing && editing.id === id) setEditing(null);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      // Update
      const { error } = await supabase.from("highlights").update({
        title: form.title,
        description: form.description,
        icon_name: form.icon_name,
        updated_at: new Date().toISOString(),
      }).eq("id", editing.id);
      if (error) {
        toast({ title: "Error", description: "Update failed", variant: "destructive" });
      } else {
        toast({ title: "Saved", description: "Highlight updated" });
        setEditing(null);
        setForm({ title: "", description: "", icon_name: iconList[0] });
        refresh();
      }
    } else {
      // Insert
      const { error } = await supabase.from("highlights").insert([form]);
      if (error) {
        toast({ title: "Error", description: "Failed to add", variant: "destructive" });
      } else {
        toast({ title: "Added", description: "Highlight added" });
        setForm({ title: "", description: "", icon_name: iconList[0] });
        refresh();
      }
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardContent className="py-4">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Title" />
          </div>
          <div>
            <label className="block font-medium mb-1">Icon</label>
            <Select value={form.icon_name} onValueChange={icon => setForm(f => ({ ...f, icon_name: icon }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose icon" />
              </SelectTrigger>
              <SelectContent>
                {iconList.map(icon => (
                  <SelectItem value={icon} key={icon}>
                    <span className="capitalize">{icon}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={2} />
          </div>
          <div className="col-span-2 flex gap-2">
            <Button disabled={loading} type="submit" className="flex-1" variant="default" >
              <Save className="w-4 h-4 mr-1" /> {editing ? "Update" : "Add"}
            </Button>
            {editing && (
              <Button type="button" variant="ghost" onClick={() => { setEditing(null); setForm({ title: "", description: "", icon_name: iconList[0] }); }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
        {/* List highlights */}
        <h3 className="font-medium mb-2 mt-4">All Highlights</h3>
        <ul>
          {highlights.map(h => (
            <li key={h.id} className="border p-3 rounded-lg flex items-center gap-3 mb-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-airbnb-gold/10">
                {/* Use icon from lucide-react */}
                <span>
                  {h.icon_name === "award" ? <span className="block w-5 h-5"><svg><use href="#icon-award"/></svg></span>
                    : h.icon_name === "utensils" ? <span className="block w-5 h-5"><svg><use href="#icon-utensils"/></svg></span>
                    : h.icon_name === "clock" ? <span className="block w-5 h-5"><svg><use href="#icon-clock"/></svg></span>
                    : h.icon_name === "pencil" ? <span className="block w-5 h-5"><svg><use href="#icon-pencil"/></svg></span>
                    : h.icon_name === "edit" ? <span className="block w-5 h-5"><svg><use href="#icon-edit"/></svg></span>
                    : h.icon_name === "text" ? <span className="block w-5 h-5"><svg><use href="#icon-text"/></svg></span>
                    : h.icon_name === "image" ? <span className="block w-5 h-5"><svg><use href="#icon-image"/></svg></span>
                    : <span className="block w-5 h-5">{h.icon_name}</span>}
                </span>
              </span>
              <div className="flex-1">
                <span className="font-semibold">{h.title}</span>
                <div className="text-sm text-muted-foreground">{h.description}</div>
              </div>
              <Button size="sm" variant="outline" className="mr-2" onClick={() => handleEdit(h)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(h.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EditHighlights;
