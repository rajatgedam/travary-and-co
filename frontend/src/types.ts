export interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string;
  departureDate: string;
  imageAlt: string;
  colorAccent: string;
}

export interface ServiceTier {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageAlt: string;
  colorAccent: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  type: 'email' | 'whatsapp' | 'instagram' | 'linkedin';
}
