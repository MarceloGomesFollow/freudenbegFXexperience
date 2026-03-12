
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Clock, Eye, CheckCircle, MoreHorizontal, AlertCircle } from "lucide-react";
import { candidateApprovals, type CandidateApproval, type ApprovalStatus } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";

export default function ApprovalsPage() {
    const [approvals, setApprovals] = useState<CandidateApproval[]>(candidateApprovals);
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleStatusChange = (userId: string, itemId: string, newStatus: ApprovalStatus) => {
        setApprovals(prev => prev.map(approval => {
            if (approval.userId === userId) {
                const newChecklist = approval.checklist.map(item =>
                    item.id === itemId ? { ...item, status: newStatus } : item
                );
                return { ...approval, checklist: newChecklist };
            }
            return approval;
        }));
    };

    const handleApproveCandidate = (userId: string) => {
        setApprovals(prev => prev.map(approval => 
            approval.userId === userId ? { ...approval, overallStatus: 'approved' } : approval
        ));
        const user = approvals.find(a => a.userId === userId);
        toast({
            title: t('toast.candidateApproved'),
            description: t('toast.candidateApprovedDesc').replace('{name}', user?.userName || ''),
        });
    };

    const StatusIcon = ({ status }: { status: ApprovalStatus }) => {
        switch (status) {
            case 'approved': return <Check className="h-4 w-4 text-green-500" />;
            case 'rejected': return <X className="h-4 w-4 text-red-500" />;
            case 'pending':
            default: return <Clock className="h-4 w-4 text-yellow-500" />;
        }
    };

    const OverallStatusBadge = ({ status }: { status: ApprovalStatus }) => {
        const variant = {
            'approved': 'default',
            'rejected': 'destructive',
            'pending': 'secondary',
        }[status] || 'secondary';

        const colorClass = {
            'approved': 'bg-green-500/20 text-green-700 dark:text-green-400',
            'rejected': 'bg-red-500/20 text-red-700 dark:text-red-400',
            'pending': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
        }[status] || '';

        const text = {
            'approved': translateDataValue('approved', t),
            'rejected': translateDataValue('rejected', t),
            'pending': translateDataValue('pending', t),
        }[status]

        // @ts-ignore
        return <Badge variant={variant} className={colorClass}>{text}</Badge>
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('approvals.title')}</h2>
                <p className="text-muted-foreground mt-2">
                    {t('approvals.subtitle')}
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t('approvals.pendingTitle')}</CardTitle>
                    <CardDescription>
                        {t('approvals.pendingDesc')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('approvals.tableCandidate')}</TableHead>
                                    <TableHead>{t('approvals.tableOverallStatus')}</TableHead>
                                    <TableHead className="hidden md:table-cell">{t('approvals.tableResponsible')}</TableHead>
                                    <TableHead className="text-center">{t('approvals.tableChecklist')}</TableHead>
                                    <TableHead className="text-right">{t('approvals.tableActions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {approvals.map((approval) => {
                                    const userAvatar = PlaceHolderImages.find(p => p.id === approval.userAvatar);
                                    const pendingItems = approval.checklist.filter(i => i.status === 'pending').length;
                                    return (
                                    <TableRow key={approval.userId}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={approval.userName} data-ai-hint="person portrait" />}
                                                    <AvatarFallback>{approval.userName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{approval.userName}</div>
                                                    <div className="text-xs text-muted-foreground">{approval.unit}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <OverallStatusBadge status={approval.overallStatus} />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <p className="font-medium">{t('approvals.unitManager')}</p>
                                            <p className="text-xs text-muted-foreground">{translateDataValue('RH', t)}</p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {pendingItems > 0 ? (
                                                    <>
                                                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                                                        <span className="text-sm text-muted-foreground">{t('approvals.pendingCount').replace('{count}', String(pendingItems))}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                        <span className="text-sm text-muted-foreground">{t('approvals.complete')}</span>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem disabled>
                                                        <Eye className="mr-2 h-4 w-4" /> {t('approvals.viewDetails')}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleApproveCandidate(approval.userId)} disabled={pendingItems > 0 || approval.overallStatus === 'approved'}>
                                                        <CheckCircle className="mr-2 h-4 w-4" /> {t('approvals.approveCandidate')}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
